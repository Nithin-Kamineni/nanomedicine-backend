const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../lib/error/BaseError");
const questionsHandler = require("../../handlers/questionsHandler"); 
const router = new express.Router();
const _ = require("lodash");

router.get("/", async (req, res) => {
    try{
        const result = await questionsHandler.GetQuestions(req.query);
        res.status(result.status || StatusCodes.OK).send(result);
    }catch (err){
        console.log(`Cannot give what buckets based on intersections that are avilable. error: ${err}`);
        if (err instanceof BaseError) {
            return err.respondWithError(res);
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: "Server Error",
        });
    }
});


//dataset -> 
router.post("/", async (req, res) => {
    try{

        const result = await questionsHandler.InsertingQuestions(req.body);
        res.status(result.status || StatusCodes.OK).send(result);
    }catch (err){
        console.log(`Cannot give what buckets based on intersections that are avilable. error: ${err}`);
        if (err instanceof BaseError) {
            return err.respondWithError(res);
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: "Server Error",
        });
    }
});



module.exports = router;