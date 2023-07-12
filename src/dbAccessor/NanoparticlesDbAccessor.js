"use strict";

const BaseDbAccessor = require("../lib/dbAccessor/BaseDbAccessor");
const dbConstants = require("../lib/dbAccessor/constants.json");
const dbSchema = require("../schema/dbSchema");
const pool = require("../lib/dbAccessor/PGConnectionPool");
const _ = require("lodash");
const { asyncLocalGet } = require("../middleware/asyncLocalStorage");
const BaseError = require("../lib/error/BaseError");
const ErrorCodes = require("../lib/error/errorCodes.json");

class nanoparticlesDbAccessor extends BaseDbAccessor {
  constructor() {
    super(dbConstants.TABLES.NANOPARTICLES, dbSchema.nanoparticlesSchema, dbSchema.updateNanoparticlesSchema);
    this.tableName = dbConstants.TABLES.NANOPARTICLES;
    this.joiSchema = dbSchema.nanoparticlesSchema;
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
      
      console.log("---------------------------------------------")
      this._removeInvalidFields(rowObject);
      console.log(rowObject);
      await this.joiSchema.fork(["id"], (schema) => schema.optional()).validateAsync(rowObject);
      
      rowObject.tumor_size =  JSON.stringify(Object.values(rowObject.tumor_size)).replace("{", "[");
      rowObject.bw_np_administration =  JSON.stringify(Object.values(rowObject.bw_np_administration)).replace("{", "[");

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

      console.log(query);
      console.log(columnValues);
      console.log("---------------------------------------------")
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

  async selectAllGraphData() {
    console.log(`call received for filter and select : req_id ${asyncLocalGet("request_id")}`);
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
   
}

module.exports = nanoparticlesDbAccessor;