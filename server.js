"use strict";
const app = require("./app");
const dotenv = require("dotenv");
const opn = require('opn');
dotenv.config();
const PORT = process.env.PORT || 8080;

//opn('http://localhost:8080/api-docs');
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

module.exports = app;