"use strict";
const _ = require("lodash");
const pool = require("../lib/dbAccessor/PGConnectionPool");
const BaseError = require("../lib/error/BaseError");
const BaseDbAccessor = require("../lib/dbAccessor/BaseDbAccessor");
const dbConstants = require("../lib/dbAccessor/constants.json");
const dbSchema = require("../schema/dbSchema");
const dotenv = require("dotenv");
const ErrorCodes = require("../lib/error/errorCodes.json");
const { asyncLocalGet } = require("../middleware/asyncLocalStorage");
dotenv.config();

class UserDbAccessor extends BaseDbAccessor {
  constructor() {
    super(dbConstants.TABLES.USER, dbSchema.userSchema, dbSchema.updateUserSchema);
  }

  async filterUsers(filter) {
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
      let rows = [];
      _.forEach(res.rows, (row) => (row = rows.push(_.omitBy(row, _.isNull))));
      return rows;
    } catch (e) {
      console.log(`error : ${JSON.stringify(e)}, req_id:  ${asyncLocalGet("request_id")}`);
      if (e.name == "ValidationError") {
        throw new BaseError(ErrorCodes.DB.JOI_VALIDATION_ERROR, e, `row in table::${this.tableName} failed filter Joi validation.`);
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while executing select query with filter");
    }
  }
}

module.exports = UserDbAccessor;
