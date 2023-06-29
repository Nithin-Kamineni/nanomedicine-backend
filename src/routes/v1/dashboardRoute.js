const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../lib/error/BaseError");
const dashboardHandler = require("../../handlers/dashboardHandler"); 
const router = new express.Router();
const _ = require("lodash");

const UserDbAccessordbAccessor = require("../../dbAccessor/UserDbAccessor");
const userDbAccessordbAccessor = new UserDbAccessordbAccessor();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: API to manage dashbaord
 */

// (column names) nanoparticles //not done
router.get("/nanoparticles/columns", async (req, res) => {
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


/** 
 * @swagger
 *   /dashboard/nanoparticles:
 *     get:
 *       summary: Get details of the user
 *       tags: [Dashboard]
 *       responses:
 *         "200":
 *           description: The details of user based on token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
// (get All) nanoparticles
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

// (filter) nanoparticles         //not done
router.post("/nanoparticles", async (req, res) => {
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

// (insert) nanoparticles        //not done
router.put("/nanoparticles", async (req, res) => {
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

// (column names) biodistribution_timelines //not done
router.get("/biodistribution/columns", async (req, res) => {
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

// (Get all) biodistribution_timelines 
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

// (filter) biodistribution_timelines //not done
router.post("/biodistribution", async (req, res) => {
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

// (insert) biodistribution_timelines //not done
router.put("/biodistribution", async (req, res) => {
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

// (column names) blooddata
router.get("/blooddata/columns", async (req, res) => {
    try{
        const result = await dashboardHandler.GetColumnsForBloodData();
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

// (select all) blooddata_timelines
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

// (filter) blooddata_timelines //not done
router.post("/blooddata", async (req, res) => {
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

// (insert) blooddata_timelines  //not done
router.put("/blooddata", async (req, res) => {
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

// (column names) nanoparticles + biodistribution_timelines
router.get("/nanoparticles&biodistribution/columns", async (req, res) => {
    try{
        const result = await dashboardHandler.GetColumnsForNanoparticlesAndBiodistributionTimelines();
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

// (select all) nanoparticles + biodistribution_timelines
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

// (filter params) nanoparticles + biodistribution_timelines
router.get("/nanoparticles&biodistribution/filter-params/", async (req, res) => {
    try{
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

// (insert) nanoparticles + biodistribution_timelines
router.put("/nanoparticles&biodistribution", async (req, res) => {
    try{
        //checking permision const authSub = _.get(req, "auth.sub", "|");
        const authSub = _.get(req, "auth.sub", "|");
        let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":authSub});
        let filteringRecord = filteringRecords[0];
        if(filteringRecord.role!="admin"){
            res.status(StatusCodes.UNAUTHORIZED).send({
                status: StatusCodes.UNAUTHORIZED,
                error: "Do not have the access or permission to add items",
            });
        }
        //schema to allow all required columns
        //

        const result = await dashboardHandler.AddNanoparticlesAndBiodistributionTimelines(req.body);
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