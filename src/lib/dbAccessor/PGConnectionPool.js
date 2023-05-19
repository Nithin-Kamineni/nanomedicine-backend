"use strict";
// Singleton pattern. Using once sigle instance of pool, so that we can limit the number of db connection by a node instance.
const { Pool } = require("pg");
const types = require("pg").types;

types.setTypeParser(1700, function (val) {
  return parseFloat(val);
});

module.exports = new Pool({
  idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT_MILLI,
  max: process.env.PG_MAX_CONNECTION,
  connectionTimeoutMillis: process.env.PG_CONNECTION_TIMEOUT_MILLI,
});
