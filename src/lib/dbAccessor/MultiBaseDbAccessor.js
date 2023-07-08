const BaseDbAccessor = require("./BaseDbAccessor");
const _ = require("lodash");
const BaseError = require("../error/BaseError");
const ErrorCodes = require("../error/errorCodes.json");
const pool = require("./PGConnectionPool");
const dbConstants = require("../dbAccessor/constants.json");

class MultiBaseDbAccessor extends BaseDbAccessor {
    constructor(joiningColumn, joiSchema, tableName1, tableName2, tableName3) {
      if(tableName3 === undefined){
        super(tableName1+'and'+tableName2, joiSchema);  
        this.viewName = tableName1+'and'+tableName2;
        this.tableName1 = tableName1;
        this.tableName2 = tableName2;
        this.joiSchema = joiSchema;
        this.JoinTwoTables(joiningColumn);
      } else {
          super(tableName1+'and'+tableName2+'and'+tableName3, joiSchema);  
          this.viewName = tableName1+'and'+tableName2+'and'+tableName3;
          this.tableName1 = tableName1;
          this.tableName2 = tableName2;
          this.tableName3 = tableName3;
          this.joiSchema = joiSchema;
          this.JoinThreeTables(joiningColumn);
        }
      }


      /**
   * Joins tables that are inputed by default.
   * @returns name of the view if row is joined, or Error if join is unsuccessfull
   */
  async JoinTwoTables(joiningColumn) {
    try {
      await pool.query(`DROP VIEW IF EXISTS ${this.viewName}`)
      await pool.query(`CREATE VIEW ${this.viewName} AS SELECT ROW_NUMBER() OVER () AS row_number, t1.*, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.TIME_POINT}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.TUMOR}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.HEART}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.LIVER}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.SPLEEN}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.LUNG}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.KIDNEY}, 
      t2.tumor_id_percentage_g, t2.tumor_id_percentage, t2.heart_id_percentage_g, t2.heart_id_percentage, t2.liver_id_percentage_g, t2.liver_id_percentage, t2.spleen_id_percentage_g, t2.spleen_id_percentage, t2.lung_id_percentage_g, t2.lung_id_percentage, t2.kidney_id_percentage_g, t2.kidney_id_percentage

      FROM ${this.tableName1} t1 JOIN ${this.tableName2} t2 ON t1.${joiningColumn}=t2.${joiningColumn};`);
    } catch (e) {
      if (_.isString(e.code) && _.startsWith(e.code, "23")) {
        throw new BaseError(ErrorCodes.DB.DATA_INTEGRITY_VIOLATION, e, "Data integrity violation while join query");
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while CREATING view.");
    }
  }

  async JoinThreeTables(joiningColumn) {
    try {
      await pool.query(`DROP VIEW IF EXISTS ${this.viewName}`)
      await pool.query(`CREATE VIEW ${this.viewName} AS SELECT t1.*, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.TIME_POINT}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.TUMOR}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.HEART}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.LIVER}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.SPLEEN}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.LUNG}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.KIDNEY} FROM ${this.tableName1} t1 JOIN ${this.tableName2} t2 ON t1.${joiningColumn}=t2.${joiningColumn} FULL OUTER JOIN ${this.tableName3} ON t2.${joiningColumn}=t3.${joiningColumn};`);
    } catch (e) {
      if (_.isString(e.code) && _.startsWith(e.code, "23")) {
        throw new BaseError(ErrorCodes.DB.DATA_INTEGRITY_VIOLATION, e, "Data integrity violation while join query");
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while CREATING view.");
    }
  }

  //write filter function here
}

module.exports = MultiBaseDbAccessor;