const { logEvents } = require("./logEvents");
const { StatusCodes } = require("http-status-codes");

const errorHandler = function (err, req, res, next) {
    logEvents(`${err.name}: ${err.message}`, 'errorLog.txt')
    console.log(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
    next();
  }

  module.exports = errorHandler;