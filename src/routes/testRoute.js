"use strict";

const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { randomNumGenerator } = require("../handlers/testHandler");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const randomNum = await randomNumGenerator();
    res.status(StatusCodes.CREATED);
    res.send({ delCount: randomNum });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.send("There was an error");
  }
});

module.exports = router;
