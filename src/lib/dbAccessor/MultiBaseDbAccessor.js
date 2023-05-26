const BaseDbAccessor = require("./BaseDbAccessor");
const _ = require("lodash");
const BaseError = require("../error/BaseError");
const ErrorCodes = require("../error/errorCodes.json");
const pool = require("./PGConnectionPool");
const dbConstants = require("../dbAccessor/constants.json");

class MultiBaseDbAccessor extends BaseDbAccessor {
    constructor(tableName1, joiSchema1, joiUpdateSchema1, tableName2, joiSchema2, joiUpdateSchema2, joiningColumn) {
        super(tableName1+'AND'+tableName2);  
        this.viewName = tableName1+'AND'+tableName2;
        this.tableName1 = tableName1;
        this.joiSchema1 = joiSchema1;
        this.joiUpdateSchema1 = joiUpdateSchema1;
        this.tableName2 = tableName2;
        this.joiSchema2 = joiSchema2;
        this.joiUpdateSchema2 = joiUpdateSchema2;
        this.JoinTwoTables(joiningColumn); 
      }

      // constructor(tableName1, joiSchema1, joiUpdateSchema1, tableName2, joiSchema2, joiUpdateSchema2, tableName3, joiSchema3, joiUpdateSchema3, joiningColumn) {
      //   super(this.viewName);
      //   this.viewName = tableName1+'|'+tableName2+'|'+tableName3;
      //   this.tableName1 = tableName1;
      //   this.joiSchema1 = joiSchema1;
      //   this.joiUpdateSchema1 = joiUpdateSchema1;
      //   this.tableName2 = tableName2;
      //   this.joiSchema2 = joiSchema2;
      //   this.joiUpdateSchema2 = joiUpdateSchema2;
      //   this.tableName3 = tableName3;
      //   this.joiSchema3 = joiSchema3;
      //   this.joiUpdateSchema3 = joiUpdateSchema3;
     
      //   this.JoinThreeTables(joiningColumn);
        
      // }

      /**
   * Joins tables that are inputed by default.
   * @returns name of the view if row is joined, or Error if join is unsuccessfull
   */
  async JoinTwoTables(joiningColumn) {
    try {
      await pool.query(`DROP VIEW IF EXISTS ${this.viewName}`)
      await pool.query(`CREATE VIEW ${this.viewName} AS SELECT t1.*, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.TIME_POINT}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.TUMOR}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.HEART}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.LIVER}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.SPLEEN}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.LUNG}, t2.${dbConstants.COLUMNS.BIODISTRIBUTION_TIMELINES.KIDNEY} FROM ${this.tableName1} t1 JOIN ${this.tableName2} t2 ON t1.${joiningColumn}=t2.${joiningColumn};`);
    } catch (e) {
      if (_.isString(e.code) && _.startsWith(e.code, "23")) {
        throw new BaseError(ErrorCodes.DB.DATA_INTEGRITY_VIOLATION, e, "Data integrity violation while join query");
      }
      throw new BaseError(ErrorCodes.DB.UNKNOWN, e, "Possible error while CREATING view.");
    }
  }

  async JoinThreeTables(joiningColumn) {
    try {
      await pool.query(`
      DO
      $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1
              FROM pg_views
              WHERE viewname = '${this.viewName}'
          ) THEN
              EXECUTE 'CREATE VIEW ${this.viewName} AS SELECT * FROM ${this.tableName1} t1 
              JOIN ${this.tableName2} t2 ON t1.${this.joiningColumn}=t2.${joiningColumn}
              JOIN ${this.tableName3} t3 ON t2.${this.joiningColumn}=t3.${joiningColumn};';
          END IF;
      END
      $$;
      `);
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