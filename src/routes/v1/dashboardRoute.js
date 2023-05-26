const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../lib/error/BaseError");
const dashboardHandler = require("../../handlers/dashboardHandler"); 
const router = new express.Router();
const _ = require("lodash");

// nanoparticles
router.get("/nanoparticles", async (req, res) => {
    try{
        const result = await dashboardHandler.GetNanoparticles(req.query);
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


// biodistribution_timelines 
router.get("/biodistribution", async (req, res) => {
    try{

        const result = await dashboardHandler.GetBiodistributionTimelines(req.body);
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

// blooddata_timelines
router.get("/blooddata", async (req, res) => {
    try{
        const result = await dashboardHandler.GetBloodDataTimelines(req.body);
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

// nanoparticles + biodistribution_timelines
router.get("/nanoparticles&biodistribution", async (req, res) => {
    try{
        const result = await dashboardHandler.GetNanoparticlesAndBiodistributionTimelines(req.body);
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

// (filter) nanoparticles + biodistribution_timelines
router.post("/nanoparticles&biodistribution", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilteredNanoparticlesAndBiodistributionTimelines(req.body);
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