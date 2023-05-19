"use strict";
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { auth } = require("express-openid-connect");
const cors = require('cors');
dotenv.config();

var corsOptions = {
    origin: process.env.UI_URL,
  };

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const CrudQuestions = require('./src/routes/v1/questionsRoute');

app.use("/api/test/", require("./src/routes/testRoute"));
app.use('/api/v1/question',CrudQuestions);

module.exports = app;