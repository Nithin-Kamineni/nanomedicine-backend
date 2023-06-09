const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../lib/error/BaseError");
const dashboardHandler = require("../../handlers/dashboardHandler"); 
const router = new express.Router();
const _ = require("lodash");

// nanoparticles + biodistribution_timelines
router.get("/nanoparticles&biodistribution/filter-params/", async (req, res) => {
    try{
        console.log("==========")
        const result = await dashboardHandler.GetFilteredParamsOfNanoparticlesAndBiodistributionTimelines(req.body);
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