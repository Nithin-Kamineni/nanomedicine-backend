"use strict";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { auth } = require("express-openid-connect");
const cors = require('cors');
const { logger } = require("./src/middleware/logEvents");
const { StatusCodes } = require("http-status-codes");
dotenv.config();

//CORS allowed url's
const whiteList = [process.env.UI_URL,process.env.MOBILE_APP_URL]
const corsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin)!==-1 || !origin){   //after development remove || !origin
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
  };

app.use(logger)

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const dashboardRoutes = require('./src/routes/v1/dashboardRoute');
const errorHandler = require("./src/middleware/errorHandler");


app.use("/api/test/", require("./src/routes/testRoute"));
app.use('/api/v1/dashboard',dashboardRoutes);

//error handeling for logging routes that are not present
app.all("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND);
  if(req.accepts('json')) {
    res.json({error: "404 Not Found"})
  }
  else {
    res.type('txt').send('404 Not Found')
  }
})

app.use(errorHandler);

module.exports = app;