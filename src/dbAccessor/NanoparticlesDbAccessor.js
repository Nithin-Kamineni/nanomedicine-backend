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