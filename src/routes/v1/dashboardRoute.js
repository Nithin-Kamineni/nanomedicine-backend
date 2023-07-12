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


/** 
 * @swagger
 *   /dashboard/nanoparticles/columns:
 *     get:
 *       summary: Get columns of the nanoparticles
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
// (column names) nanoparticles
router.get("/nanoparticles/columns", async (req, res) => {
    try{
        const result = await dashboardHandler.GetNanoparticlesColumns();
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
 *       summary: Get details of the nanoparticles
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

/** 
 * @swagger
 *   /dashboard/nanoparticles/filter-params:
 *     get:
 *       summary: Get filter-parameters of nanoparticles
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
// (filter-params) nanoparticles
router.get("/nanoparticles/filter-params", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilterParamsForNanoparticles();
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
 *     post:
 *       summary: Get details of the nanoparticles (filter)
 *       tags: [Dashboard]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/nanoparticles_filter'
 *       responses:
 *         "200":
 *           description: The details of nanoparticles based on filter parameters
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
// (filter) nanoparticles         //not done
router.post("/nanoparticles", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilteredDataNanoparticles(req.body);
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


/** 
 * @swagger
 *   /dashboard/biodistribution/columns:
 *     get:
 *       summary: Get columns of the biodistribution_timelines
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
// (column names) biodistribution_timelines
router.get("/biodistribution/columns", async (req, res) => {
    try{

        const result = await dashboardHandler.GetBiodistributionTimelinesColumns(req.body);
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
 *   /dashboard/biodistribution:
 *     get:
 *       summary: Get details of the biodistribution_timelines
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

/** 
 * @swagger
 *   /dashboard/biodistribution/filter-params:
 *     get:
 *       summary: Get filter parameters of biodistribution
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
// (filter-params) biodistribution_timelines
router.get("/biodistribution/filter-params", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilterParamsForBiodistributionTimelines();
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
 *   /dashboard/biodistribution:
 *     post:
 *       summary: Get details biodistribution (filter)
 *       tags: [Dashboard]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/biodistribution_filter'
 *       responses:
 *         "200":
 *           description: The details of biodistribution based on filter parameters
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
// (filter) biodistribution_timelines
router.post("/biodistribution", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilteredDataForBiodistributionTimelines(req.body);
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


/** 
 * @swagger
 *   /dashboard/blooddata/columns:
 *     get:
 *       summary: Get columns of the blooddata_timelines
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

/** 
 * @swagger
 *   /dashboard/blooddata:
 *     get:
 *       summary: Get details of the blooddata_timelines
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

/** 
 * @swagger
 *   /dashboard/blooddata/filter-params:
 *     get:
 *       summary: Get filter parameters of blooddata_timelines
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
// (filter-params) blooddata_timelines
router.get("/blooddata/filter-params", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilterParamsForBloodData(req.body);
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
 *   /dashboard/blooddata:
 *     post:
 *       summary: Get details of the blooddata_timelines (filter)
 *       tags: [Dashboard]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/blooddata_filter'
 *       responses:
 *         "200":
 *           description: The details of blooddata_timelines based on filter parameters
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
// (filter) blooddata_timelines
router.post("/blooddata", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilteredDataForBloodData(req.body);
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

// (insert) blooddata_timelines
router.put("/blooddata", async (req, res) => {
    try{
        const authSub = _.get(req, "auth.sub", "|");
        let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":authSub});
        let filteringRecord = filteringRecords[0];
        if(filteringRecord.role!="admin"){
            res.status(StatusCodes.UNAUTHORIZED).send({
                status: StatusCodes.UNAUTHORIZED,
                error: "Do not have the access or permission to add items",
            });
        }
        
        const result = await dashboardHandler.InsertDataForBloodData(req.body);
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
 *   /dashboard/nanoparticles&biodistribution/columns:
 *     get:
 *       summary: Get columns of the nanoparticles and biodistribution
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

/** 
 * @swagger
 *   /dashboard/nanoparticles&biodistribution:
 *     get:
 *       summary: Get details of the nanoparticles and biodistribution
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

/** 
 * @swagger
 *   /dashboard/nanoparticles&biodistribution/filter-params:
 *     get:
 *       summary: Get filter parameters of the nanoparticles and biodistribution
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
// (filter params) nanoparticles + biodistribution_timelines
router.get("/nanoparticles&biodistribution/filter-params", async (req, res) => {
    try{
        const result = await dashboardHandler.GetFilteredParamsOfNanoparticlesAndBiodistributionTimelines();
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
 *   /dashboard/nanoparticles&biodistribution:
 *     post:
 *       summary: Get details of the nanoparticles and biodistribution (filter)
 *       tags: [Dashboard]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/nanoparticles_biodistribution_filter'
 *       responses:
 *         "200":
 *           description: The details of nanoparticles and biodistribution based on filter parameters
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
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

/** 
 * @swagger
 *   /dashboard/nanoparticles&biodistribution:
 *     put:
 *       summary: Insert details into nanoparticles and biodistribution
 *       tags: [Dashboard]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/nanoparticles_biodistributionTimelinesSchema'
 *       responses:
 *         "200":
 *           description: Adding details of nanoparticles and biodistribution into database based on token permission
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
// (insert) nanoparticles + biodistribution_timelines    check schema
router.put("/nanoparticles&biodistribution", async (req, res) => {
    try{
        //checking permision
        // const authSub = _.get(req, "auth.sub", "|");
        // let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":authSub});
        // let filteringRecord = filteringRecords[0];
        // if(filteringRecord.role!="admin"){
        //     res.status(StatusCodes.UNAUTHORIZED).send({
        //         status: StatusCodes.UNAUTHORIZED,
        //         error: "Do not have the access or permission to add items",
        //     });
        // }

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

/** 
 * @swagger
 *   /dashboard/nanoparticles&biodistribution/check/{nano_tumor_id}:
 *     get:
 *       summary: Check details into nanoparticles and biodistribution
 *       tags: [Dashboard]
 *       parameters:
 *         - in: path
 *           name: nano_tumor_id
 *           required: true
 *           description: Replace `routeVariable` with your desired route variable name
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: Adding details of nanoparticles and biodistribution into database based on token permission
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
// (check) nanoparticles + biodistribution_timelines    check schema
router.get("/nanoparticles&biodistribution/check/:routeVariable", async (req, res) => {
    try{
        //checking permision
        // const authSub = _.get(req, "auth.sub", "|");
        // let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":authSub});
        // let filteringRecord = filteringRecords[0];
        // if(filteringRecord.role!="admin"){
        //     res.status(StatusCodes.UNAUTHORIZED).send({
        //         status: StatusCodes.UNAUTHORIZED,
        //         error: "Do not have the access or permission to add items",
        //     });
        // }
        const routeVariable = req.params.routeVariable;
        console.log(routeVariable);
        const result = await dashboardHandler.CheckdNanoparticlesAndBiodistributionTimelinesById({id:routeVariable, rowName: "nano_tumor_id"});
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
 *   /dashboard/nanoparticles&biodistribution/{row_number}:
 *     get:
 *       summary: Get details of a record by row_number(Id) in nanoparticles and biodistribution
 *       tags: [Dashboard]
 *       parameters:
 *         - in: path
 *           name: row_number
 *           required: true
 *           description: Replace `routeVariable` with your desired route variable name
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: Adding details of nanoparticles and biodistribution into database based on token permission
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */

// (Read) nanoparticles + biodistribution_timelines    check schema
router.get("/nanoparticles&biodistribution/:routeVariable", async (req, res) => {
    try{
        //checking permision const authSub = _.get(req, "auth.sub", "|");
        // const authSub = _.get(req, "auth.sub", "|");
        // let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":authSub});
        // let filteringRecord = filteringRecords[0];
        // if(filteringRecord.role!="admin"){
        //     res.status(StatusCodes.UNAUTHORIZED).send({
        //         status: StatusCodes.UNAUTHORIZED,
        //         error: "Do not have the access or permission to add items",
        //     });
        // }
        const routeVariable = req.params.routeVariable;
        console.log(routeVariable);
        const result = await dashboardHandler.GetNanoparticlesAndBiodistributionTimelinesById({id:routeVariable, rowName: "row_number"});
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
 *   /dashboard/nanoparticles&biodistribution:
 *     patch:
 *       summary: Update details into nanoparticles and biodistribution
 *       tags: [Dashboard]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/nanoparticles_biodistributionTimelinesSchema'
 *       responses:
 *         "200":
 *           description: Adding details of nanoparticles and biodistribution into database based on token permission
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
// (Edit) nanoparticles + biodistribution_timelines    check schema
router.patch("/nanoparticles&biodistribution", async (req, res) => {
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

/** 
 * @swagger
 *   /dashboard/nanoparticles&biodistribution/{row_number}:
 *     delete:
 *       summary: Delete record of nanoparticles and biodistribution
 *       tags: [Dashboard]
 *       parameters:
 *         - in: path
 *           name: row_number
 *           required: true
 *           description: Replace `routeVariable` with your desired route variable name
 *           schema:
 *             type: string
 *       responses:
 *         "200":
 *           description: Adding details of nanoparticles and biodistribution into database based on token permission
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/nanoparticles'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */

// (delete) nanoparticles + biodistribution_timelines    check schema
router.delete("/nanoparticles&biodistribution/:routeVariable", async (req, res) => {
    try{
        //checking permision const authSub = _.get(req, "auth.sub", "|");
        // const authSub = _.get(req, "auth.sub", "|");
        // let filteringRecords = await userDbAccessordbAccessor.filterAndSelect({"auth0_id":authSub});
        // let filteringRecord = filteringRecords[0];
        // if(filteringRecord.role!="admin"){
        //     res.status(StatusCodes.UNAUTHORIZED).send({
        //         status: StatusCodes.UNAUTHORIZED,
        //         error: "Do not have the access or permission to add items",
        //     });
        // }
        const routeVariable = req.params.routeVariable;
        console.log(routeVariable);
        await dashboardHandler.DeleteNanoparticlesAndBiodistributionTimelinesById({id:routeVariable, rowName: "row_number"});
        res.status(StatusCodes.OK).send();
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