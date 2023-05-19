"use strict";
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

module.exports = app;