"use strict";

const BaseDbAccessor = require("../lib/dbAccessor/BaseDbAccessor");
const dbConstants = require("../lib/dbAccessor/constants.json");
const dbSchema = require("../schema/dbSchema");
const pool = require("../lib/dbAccessor/PGConnectionPool");
const _ = require("lodash");
const { asyncLocalGet } = require("../middleware/asyncLocalStorage");
const BaseError = require("../lib/error/BaseError");
const ErrorCodes = require("../lib/error/errorCodes.json");

class biodistributionDbAccessor extends BaseDbAccessor {
  constructor() {
    super(dbConstants.TABLES.BIODISTRIBUTION_TIMELINES, dbSchema.biodistributionTimelinesScehma, dbSchema.updateBiodistributionTimelinesSchema);
    }

  //returning all the questions
  async selectAllQuestions(options){  

    let query = `SELECT * from nanoparticles ORDER BY id ASC LIMIT 2`;
    console.log(dbConstants.TABLES.NANOPARTICLES)
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
  async insertingQuestions(options){  

    let insertquery = `INSERT INTO Questions (id, question, answer, option1, option2, option3, option4) VALUES ($1, $2, $3, $4, $5)`;
    const insertValues = [options.question, options.answer, options.option1, options.option2, options.option3, options.option4];
    
    console.log(insertquery);

    try{
      // await pool.query(insertquery, insertValues);
      console.log(`Test Inserted row: ${options}`);
    } catch(e) {
      console.log(`error : ${JSON.stringify(e)}`);
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed filter Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing select query with filter");
    }
  }
}

module.exports = biodistributionDbAccessor;