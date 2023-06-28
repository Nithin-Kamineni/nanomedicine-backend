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

  //returning all the questions
  async selectAllQuestions(options){  

    let query = `SELECT * from nanoparticles ORDER BY id ASC LIMIT 2`;
    console.log(dbConstants.TABLES.NANOPARTICLES);
    console.log(query);

    // curently no database so just dummy values
    try{
      const res = await pool.query(query);
      let rows = res.rows;
      
      let rowsArr = [];
      _.forEach(rows, (row) => rowsArr.push(row));
      return rowsArr;
      // return {"message":"Test select"}

    } catch(e) {
      console.log(`error : ${JSON.stringify(e)}`);
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed filter Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing select query with filter");
    }
  }

  //Inserting Questions
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
        if(typeof columnValue === 'object' && columnValue !== null){
          const rangeValue = `[${columnValue.min},${columnValue.max}]`;
          columnValues.push(rangeValue);
        }
        else{
          columnValues.push(columnValue);
        }
        
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
}

module.exports = nanoparticlesDbAccessor;