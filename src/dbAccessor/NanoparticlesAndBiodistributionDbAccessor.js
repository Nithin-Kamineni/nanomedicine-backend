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
    super(dbConstants.TABLES.NANOPARTICLES, dbConstants.TABLES.BIODISTRIBUTION_TIMELINES, dbConstants.COLUMNS.NANOPARTICLES.NANO_TUMOR_ID, dbSchema.nanoparticlesAndBiodistributionTimelinesSchema);
    }

    //code to filter the nanoparticles
  
}

module.exports = nanoparticlesAndBiodistributionDbAccessor;