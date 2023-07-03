"use strict";

const BaseDbAccessor = require("../lib/dbAccessor/BaseDbAccessor");
const dbConstants = require("../lib/dbAccessor/constants.json");
const dbSchema = require("../schema/dbSchema");
const pool = require("../lib/dbAccessor/PGConnectionPool");
const _ = require("lodash");
const { asyncLocalGet } = require("../middleware/asyncLocalStorage");
const BaseError = require("../lib/error/BaseError");
const ErrorCodes = require("../lib/error/errorCodes.json");

class blooddataDbAccessor extends BaseDbAccessor {
  constructor() {
    super(dbConstants.TABLES.BLOOD_DATA_TIMELINES, dbSchema.bloodDataTimlinesSchema, dbSchema.updateBloodDataTimlinesSchema);
    }

  //code to filter the blooddata
  async filterAndSelect(filter) {
    console.log(`call received for filter and select : req_id ${asyncLocalGet("request_id")} filter: ${filter}`);
    const start = new Date().getMilliseconds();
    
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
        // following are numbers filters size_tem, size_hd, zeta_potential, time_point, tumor, heart, liver, spleen, lung, kidney
        //following are ranges tumor_size, bw_np_administration
        if(columnName=="plasma_id_pc"||columnName=="time_point"){
          let lowerColumnValue = columnValue[0];
          let upperColumnValue = columnValue[1];
          values.push(lowerColumnValue);
          values.push(upperColumnValue);
          whereClause.push(`${columnName} >= $${i++} AND ${columnName} <= $${i++}`);
        }     
      });
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
}

module.exports = blooddataDbAccessor;