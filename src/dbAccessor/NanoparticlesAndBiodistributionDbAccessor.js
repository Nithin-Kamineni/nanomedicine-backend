"use strict";

const MultiBaseDbAccessor = require("../lib/dbAccessor/MultiBaseDbAccessor");
const dbConstants = require("../lib/dbAccessor/constants.json");
const dbSchema = require("../schema/dbSchema");
const pool = require("../lib/dbAccessor/PGConnectionPool");
const _ = require("lodash");
const { asyncLocalGet } = require("../middleware/asyncLocalStorage");
const BaseError = require("../lib/error/BaseError");
const ErrorCodes = require("../lib/error/errorCodes.json");

class nanoparticlesAndBiodistributionDbAccessor extends MultiBaseDbAccessor {
  constructor() {
    // super(dbConstants.TABLES.NANOPARTICLES, dbSchema.NANOPARTICLES, dbSchema.NANOPARTICLES);
    super(dbConstants.COLUMNS.NANOPARTICLES.NANO_TUMOR_ID, dbSchema.nanoparticlesAndBiodistributionTimelinesSchema, dbConstants.TABLES.NANOPARTICLES, dbConstants.TABLES.BIODISTRIBUTION_TIMELINES);
    }

    //code to filter the nanoparticles
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
          if(columnName=="pdi"||columnName=="size_tem"||columnName=="size_hd"||columnName=="zeta_potential"||columnName=="time_point"||columnName=="tumor"||columnName=="heart"||columnName=="liver"||columnName=="spleen"||columnName=="lung"||columnName=="kidney"){
            let lowerColumnValue = columnValue[0];
            let upperColumnValue = columnValue[1];
            values.push(lowerColumnValue);
            values.push(upperColumnValue);
            whereClause.push(`${columnName} >= $${i++} AND ${columnName} <= $${i++}`);
          }
          else if(columnName=="tumor_size"||columnName=="bw_np_administration"){
            values.push(`[${columnValue.toString()}]`);
            whereClause.push(`${columnName} && $${i++}`);
          }
          else if(Array.isArray(columnValue)){
            values.push(...columnValue);
            whereClause.push(`${columnName} IN (${columnValue.map(name => `$${i++}`).join(', ')})`); 
          }
          else{
            values.push(columnValue);
            whereClause.push(`${columnName} = $${i++}`);
          }     
        });
        console.log(filter)
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

module.exports = nanoparticlesAndBiodistributionDbAccessor;