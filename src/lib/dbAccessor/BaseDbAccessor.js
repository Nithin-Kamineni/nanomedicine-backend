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
      
      console.log("---------------------------------------------")
      this._removeInvalidFields(rowObject);
      console.log(rowObject);
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

      console.log(query);
      console.log(columnValues)
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
      // const filterSchema = this.joiSchema.fork(Object.keys(this.joiSchema.describe().keys), (schema) => schema.optional());
      // await filterSchema.validateAsync(filter);
      
      let i = 1;
      console.log(filter)
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

  async selectColumnNames() {
    console.log(`call received for filter and select : req_id ${asyncLocalGet("request_id")} filter:{}`);
    const start = new Date().getMilliseconds();
    try {
      // const filterSchema = this.joiSchema.fork(Object.keys(this.joiSchema.describe().keys), (schema) => schema.optional());
      // await filterSchema.validateAsync(filter);

      
      const query = `SELECT column_name,data_type FROM information_schema.columns WHERE table_name = '${this.tableName}' ORDER BY ordinal_position;`;
      console.log(query);
      const res = await pool.query(query);
      let rows = res.rows;
      const rowsArr = [];
      _.forEach(rows, (row) => rowsArr.push(_.omitBy(row, _.isNull)));
      
      let columnNames = [];
      for (let i = 0; i < rowsArr.length; i++) {
        columnNames.push({"columnNames": rowsArr[i].column_name, "columnTypes": rowsArr[i].data_type});
      }
      const end = new Date().getMilliseconds();
      console.log(`db call received for select all : req_id ${asyncLocalGet("request_id")} took: ${end - start} millis`);
      return {"Columns": columnNames};
    } catch (e) {
      console.log(`Db call error : req_id ${asyncLocalGet("request_id")} error: ${e}`);
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed filter Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing select query with filter");
    }
  }

  async columnAndParameters() {
    let query = `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${this.tableName}'`;
    let res = await pool.query(query);
    let columnNamesAndTypes = res.rows;
    let paramList;
    let rows;
    let columnName;
    let NullValueCount;
    // console.log(columnNamesAndTypes);

    const output = {};
    for(let i=0;i<columnNamesAndTypes.length;i++){
      columnName = columnNamesAndTypes[i].column_name
      if(columnName=="year_of_cited_record"){
        query = `select min(${columnName}),max(${columnName}) from ${this.tableName}`;
        res = await pool.query(query);
        rows = res.rows;
        if(rows[0]["max"]==Infinity){
          rows[0]["max"]="Infinity"
        }
        if(rows[0]["min"]==-Infinity){
          rows[0]["min"]="-Infinity"
        }

        query = `select ${columnName} from ${this.tableName} WHERE ${columnName} IS NULL`;
        res = await pool.query(query);
        NullValueCount = res.rows;
        if(NullValueCount.length>0){
          rows[0].includeNull = true;
        } else{
          rows[0].includeNull = false;
        }
        output[columnName] = rows[0];
      }
      else if(columnNamesAndTypes[i].data_type=='integer'||columnNamesAndTypes[i].data_type=='bigint'){
        continue;
      }
      else if(columnNamesAndTypes[i].data_type=='character varying'){
        query = `select DISTINCT(${columnName}) from ${this.tableName}`;
        res = await pool.query(query);
        rows = res.rows;
        paramList = rows.map(data => data[columnName]);
        //output[columnName] = paramList.filter((element) => element !== null);
        output[columnName] = {"value" :paramList.filter((element) => element !== null)};

        query = `select ${columnName} from ${this.tableName} WHERE ${columnName} IS NULL`;
        res = await pool.query(query);
        NullValueCount = res.rows;
        if(NullValueCount.length>0){
          output[columnName].includeNull = true;
        } else{
          output[columnName].includeNull = false;
        }
      }
      else if(columnNamesAndTypes[i].data_type=='numrange'){
        query = `select min(LOWER(${columnName})),max(UPPER(${columnName})) from ${this.tableName}`;
        res = await pool.query(query);
        rows = res.rows;
        if(rows[0]["max"]==Infinity){
          rows[0]["max"]="1000"
        }
        if(rows[0]["min"]==-Infinity){
          rows[0]["min"]="-1000"
        }

        query = `select ${columnName} from ${this.tableName} WHERE ${columnName} IS NULL`;
        res = await pool.query(query);
        NullValueCount = res.rows;
        if(NullValueCount.length>0){
          rows[0].includeNull = true;
        } else{
          rows[0].includeNull = false;
        }
        output[columnName] = rows[0];
      }
      else if(columnNamesAndTypes[i].data_type=='numeric' || columnNamesAndTypes[i].data_type=='double precision'){
        query = `select min(${columnName}),max(${columnName}) from ${this.tableName}`;
        res = await pool.query(query);
        rows = res.rows;
        if(rows[0]["max"]==Infinity){
          rows[0]["max"]="1000"
        }
        if(rows[0]["min"]==-Infinity){
          rows[0]["min"]="-1000"
        }

        query = `select ${columnName} from ${this.tableName} WHERE ${columnName} IS NULL`;
        res = await pool.query(query);
        NullValueCount = res.rows;
        if(NullValueCount.length>0){
          rows[0].includeNull = true;
        } else{
          rows[0].includeNull = false;
        }
        output[columnName] = rows[0];
      }
      else{
        throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Error due to column type");
      }

    }
    return output;
  }

  async filterAndSelectBasedOnParams(filter) {
    console.log(`call received for filter and select : req_id ${asyncLocalGet("request_id")} filter: ${filter}`);
    const start = new Date().getMilliseconds();

    let query = `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = '${this.tableName}'`;
    let res = await pool.query(query);
    let columnNamesAndTypes = res.rows;
    let lowerColumnValue;
    let upperColumnValue;
    let includeNull;
    const columnTypesMap = {};
    columnNamesAndTypes.forEach(item => {
      const column_name = item.column_name;
      const data_type = item.data_type;
      columnTypesMap[column_name] = data_type;
    });
    // console.log(columnTypesMap);
    // console.log(filter);
    try {
      let whereClause = [];
      let values = [];
      // const filterSchema = this.joiSchema.fork(Object.keys(this.joiSchema.describe().keys), (schema) => schema.optional());
      // await filterSchema.validateAsync(filter);
      

      let i = 1;
      _.forEach(filter, (columnValue, columnName) => {
        
        if (_.isEmpty(columnName) || _.isEmpty(columnValue)) {
          return;
        }
        if(columnName=="operation"){
          return;  //continue
        }
        if(columnTypesMap[columnName]=="double precision"||columnTypesMap[columnName]=="numeric"||columnName=="year_of_cited_record"){
          includeNull = false;
          lowerColumnValue = columnValue.min;
          upperColumnValue = columnValue.max;
          if('includeNull' in columnValue){
            includeNull = columnValue.includeNull
          }
          values.push(lowerColumnValue);
          values.push(upperColumnValue);
          if(includeNull){
            whereClause.push(`((${columnName} >= $${i++} AND ${columnName} <= $${i++}) OR (${columnName} IS NULL))`);
          }
          else if(!includeNull){
            whereClause.push(`(${columnName} >= $${i++} AND ${columnName} <= $${i++})`);
          }
        }
        else if(columnTypesMap[columnName]=="numrange"){
          includeNull = false;
          lowerColumnValue = columnValue.min;
          upperColumnValue = columnValue.max;
          if('includeNull' in columnValue){
            includeNull = columnValue.includeNull
          }

          values.push(`[${lowerColumnValue},${upperColumnValue}]`);
          if(includeNull){
            whereClause.push(`(${columnName} && $${i++})`);  
          }
          else if(!includeNull){
            whereClause.push(`((${columnName} && $${i++}) OR (${columnName} IS NULL))`);
          }
        }
        else if(columnTypesMap[columnName]=="character varying"){
          includeNull = false;
          if('includeNull' in columnValue){
            includeNull = columnValue.includeNull
          }
          columnValue.value = columnValue.value.filter((value) => value !== null);
          values.push(...columnValue.value);

          if(includeNull){
            console.log('here')
            whereClause.push(`(${columnName} IN (${columnValue.value.map(name => `$${i++}`).join(', ')}) OR (${columnName} IS NULL))`); 
          }
          else if(!includeNull){
            whereClause.push(`(${columnName} IN (${columnValue.value.map(name => `$${i++}`).join(', ')}))`); 
          }
          
        }
        else if(columnTypesMap[columnName]=="integer" && columnName!="year_of_cited_record"){
          return; //continue
        }
        else{
          values.push(columnValue);
          whereClause.push(`${columnName} = $${i++}`);
        }     
      });
      // console.log(filter)
      let query;
      if(filter.operation=="intersection"){
        query = `SELECT * from ${this.tableName} WHERE ${whereClause.join(" AND ")}`;
      }
      else if(filter.operation=="union"){
        query = `SELECT * from ${this.tableName} WHERE ${whereClause.join(" OR ")}`;
      }
      else {
        throw new BaseError(ErrorCodes.DB.UNKNOWN, e, `row in table::${this.tableName} failed Operation not defined.`);
      }
      console.log(query);
      console.log(values);
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
