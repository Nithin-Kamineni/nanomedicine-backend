"use strict";
const _ = require("lodash");
const pool = require("./PGConnectionPool");
const ErrorCodes = require("../error/errorCodes.json");
const BaseError = require("../error/BaseError");
const { asyncLocalGet } = require("../../middleware/asyncLocalStorage");
const { object } = require("joi");

class BaseDbAccessor {
  constructor(tableName, joiSchema, joiUpdateSchema) {
    this.tableName = tableName;
    this.joiSchema = joiSchema;
    this.joiUpdateSchema = joiUpdateSchema;
  }

  /**
   * selects row specified by id from db.
   * @param {string} id
   * @returns row;
   */
  async selectById(id, clientArg) {
    try {
      const client = _.isEmpty(clientArg) ? pool : clientArg;
      const res = await client.query(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);
      let row = res.rows[0];
      row = _.omitBy(row, _.isNull);
      return row;
    } catch (e) {
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while querying db.");
    }
  }

  /**
   * Deletes row specified by id from db.
   * @param {string} id
   * @returns 1 if row is deleted, or 0 if row is not found
   */
  async deleteById(id) {
    try {
      const res = await pool.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
      const deleteRowCount = res.rowCount;
      return deleteRowCount;
    } catch (e) {
      if (_.isString(e.code) && _.startsWith(e.code, "23")) {
        throw new BaseError(ErrorCodes.DB.DATA_INTEGRITY_VIOLATION, e, "Data integrity violation while executing DELETE query");
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing DELETE query.");
    }
  }

  /**
   *
   * @param {Object} rowObject, containing vaild column
   * @returns updated row
   */
  async update(rowObject, clientArg) {
    const client = _.isEmpty(clientArg) ? pool : clientArg;
    try {
      delete rowObject.created_at;
      rowObject["modified_at"] = new Date().toISOString();
      this._removeInvalidFields(rowObject);
      await this.joiUpdateSchema.validateAsync(rowObject);
      let id = _.get(rowObject, "id");
      delete rowObject.id;
      let columnValues = [];
      let setColumnPlaceHolder = [];
      let i = 1;
      _.forEach(rowObject, (columnValue, columnName) => {
        columnValues.push(columnValue);
        setColumnPlaceHolder.push(`${columnName} = $${i++}`);
      });
      columnValues.push(id);
      let query = `UPDATE ${this.tableName} SET ${setColumnPlaceHolder.join(", ")} WHERE id=$${i++} RETURNING *`;
      let res = await client.query(query, columnValues);
      let row = res.rows[0];
      row = _.omitBy(row, _.isNull);
      return row;
    } catch (e) {
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed update Joi validation.`);
      }
      if (_.isString(e.code) && _.startsWith(e.code, "23")) {
        throw new BaseError(ErrorCodes.DB.DATA_INTEGRITY_VIOLATION, e, "Data integrity violation while executing UPDATE query");
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing UPDATE query");
    }
  }

  /**
   *
   * @param {Object} rowObject, passing Joi validation
   * @returns inserted row
   */
  async insert(rowObject, clientArg) {

    const client = _.isEmpty(clientArg) ? pool : clientArg;
    try {
      delete rowObject.created_at;
      rowObject["modified_at"] = new Date().toISOString();
      rowObject["created_at"] = new Date().toISOString();
      
      this._removeInvalidFields(rowObject);

      

      await this.joiSchema.fork(["id"], (schema) => schema.optional()).validateAsync(rowObject);
      
      let columnNames = [];
      let columnValues = [];
      let valuesPlaceHolder = [];
      let i = 1;
      _.forEach(rowObject, (columnValue, columnName) => {
        columnNames.push(columnName);
        columnValues.push(columnValue);
        valuesPlaceHolder.push(`$${i++}`);
      });
      let query = `INSERT INTO ${this.tableName} (${columnNames.join(", ")}) VALUES (${valuesPlaceHolder.join(", ")}) RETURNING *`;

      // console.log(query);
      let res = await client.query(query, columnValues);
      let row = res.rows[0];
      return _.omitBy(row, _.isNull);
      
    } catch (e) {
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed update Joi validation.`);
      }
      if (_.isString(e.code) && _.startsWith(e.code, "23")) {
        throw new BaseError(ErrorCodes.DB.DATA_INTEGRITY_VIOLATION, e, "Data integrity violation while executing UPDATE query");
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing UPDATE query");
    }
  }

  async selectAll(filter) {
    console.log(`call received for filter and select : req_id ${asyncLocalGet("request_id")} filter: ${filter}`);
    const start = new Date().getMilliseconds();
    try {
      // const filterSchema = this.joiSchema.fork(Object.keys(this.joiSchema.describe().keys), (schema) => schema.optional());
      // await filterSchema.validateAsync(filter);

      
      const query = `SELECT * from ${this.tableName}`;
      const res = await pool.query(query);
      let rows = res.rows;
      const rowsArr = [];
      _.forEach(rows, (row) => rowsArr.push(_.omitBy(row, _.isNull)));
      const end = new Date().getMilliseconds();
      console.log(`db call received for select all : req_id ${asyncLocalGet("request_id")} took: ${end - start} millis`);
      return rowsArr;
    } catch (e) {
      console.log(`Db call error : req_id ${asyncLocalGet("request_id")} error: ${e}`);
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed filter Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing select query with filter");
    }
  }

  async filterAndSelect(filter) {
    console.log(`call received for filter and select : req_id ${asyncLocalGet("request_id")} filter: ${filter}`);
    const start = new Date().getMilliseconds();
    try {
      let whereClause = [];
      let values = [];
      const filterSchema = this.joiSchema.fork(Object.keys(this.joiSchema.describe().keys), (schema) => schema.optional());
      await filterSchema.validateAsync(filter);
      let i = 1;
      _.forEach(filter, (columnValue, columnName) => {
        if (_.isEmpty(columnName) || _.isEmpty(columnValue)) {
          return;
        }
        values.push(columnValue);
        whereClause.push(`${columnName} = $${i++}`);
      });
      const query = `SELECT * from ${this.tableName} WHERE ${whereClause.join(" AND ")}`;
      const res = await pool.query(query, values);
      let rows = res.rows;
      const rowsArr = [];
      _.forEach(rows, (row) => rowsArr.push(_.omitBy(row, _.isNull)));
      const end = new Date().getMilliseconds();
      console.log(`db call received for filter and select : req_id ${asyncLocalGet("request_id")} took: ${end - start} millis`);
      return rowsArr;
    } catch (e) {
      console.log(`Db call error : req_id ${asyncLocalGet("request_id")} error: ${e}`);
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed filter Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing select query with filter");
    }
  }

  async filterAndSelectRegx(filter) {
    console.log(`call received for filter and select : req_id ${asyncLocalGet("request_id")} filter: ${filter}`);
    const start = new Date().getMilliseconds();
    try {
      let whereClause = [];
      let values = [];
      // const filterSchema = this.joiSchema.fork(Object.keys(this.joiSchema.describe().keys), (schema) => schema.optional());
      // await filterSchema.validateAsync(filter);
      let i = 1;
      // console.log(filter);
      _.forEach(filter, (columnValue, columnName) => {
        if (_.isEmpty(columnName) || _.isEmpty(columnValue)) {
          return;
        }
        if(typeof columnValue == 'object'){
          // console.log(columnValue.length)
          for(let j=0;j<columnValue.length;j++){
            values.push(columnValue[j]);
            whereClause.push(`${columnName} ~ $${i++}`);
          }
        } else{
            values.push(columnValue);
            whereClause.push(`${columnName} ~ $${i++}`);
        }
      });
      const query = `SELECT * from ${this.tableName} WHERE ${whereClause.join(" OR ")}`;
      // console.log("-----------------------------------------------------");
      // console.log(query);
      // console.log("-----------------------------------------------------");
      const res = await pool.query(query, values);
      let rows = res.rows;
      const rowsArr = [];
      _.forEach(rows, (row) => rowsArr.push(_.omitBy(row, _.isNull)));
      const end = new Date().getMilliseconds();
      console.log(`db call received for filter and select : req_id ${asyncLocalGet("request_id")} took: ${end - start} millis`);
      return rowsArr;
    } catch (e) {
      console.log(`Db call error : req_id ${asyncLocalGet("request_id")} error: ${e}`);
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed filter Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing select query with filter");
    }
  }

  _removeInvalidFields(rowObject) {
    let validColumns = _.keys(this.joiSchema.describe().keys);
    let rows = [];
    if (_.isArray(rowObject)) {
      rows = rowObject;
    } else {
      rows = [rowObject];
    }
    _.forEach(rows, (rowObject) => {
      _.forEach(rowObject, (_val, key) => {
        if (!_.includes(validColumns, key)) {
          delete rowObject[key];
        }
      });
    });
  }
}

module.exports = BaseDbAccessor;
