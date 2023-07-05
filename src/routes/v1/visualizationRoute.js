const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../lib/error/BaseError");
const authHandler = require("../../handlers/AuthHandler"); 
const router = new express.Router();
const _ = require("lodash");
const multer = require('multer');
const path = require('path');
const visualizationdHandler = require("../../handlers/visualizationHandler"); 
const requestBodiesSchema = require('../../schema/requestBodySchema')

/**
 * @swagger
 * tags:
 *   name: Visualization
 *   description: API to manage Graphs
 */

/** 
 * @swagger
 *   /visualization/filter-params:
 *     get:
 *       summary: Get filter-parameters of nanoparticles
 *       tags: [Visualization]
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
router.get("/filter-params", async (req, res) => {
    try{
        console.log("===================================")
        const result = await visualizationdHandler.GetFilterParamsForGraphs();
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
 *   /visualization/:
 *     get:
 *       summary: Get types of delivary efficiency
 *       tags: [Visualization]
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
// (get All) types of delivary efficiency
router.get("/", async (req, res) => {
    try{
        const result = await visualizationdHandler.GetTypesOfDeliveryEfficiency();
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
 *   /visualization/delivery_efficiency_tumor/:
 *     get:
 *       summary: Get types of columsn for delivary efficiency
 *       tags: [Visualization]
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
// (get All) types of delivary efficiency
router.get("/:delivery_efficiency/", async (req, res) => {
    try{
        const result = await visualizationdHandler.GetTypesOfColumns();
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
 *   /visualization/delivery_efficiency_tumor/year_of_cited_record:
 *     get:
 *       summary: Get details of the year_of_cited_record and delivery_efficiency_tumor
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_tumor/particle_type:
 *     get:
 *       summary: Get details of the particle_type and delivery_efficiency_tumor
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_tumor/targeting_strategy:
 *     get:
 *       summary: Get details of the targeting_strategy and delivery_efficiency_tumor
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_tumor/surface_charge:
 *     get:
 *       summary: Get details of the surface_charge and delivery_efficiency_tumor
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_tumor/shape:
 *     get:
 *       summary: Get details of the shape and delivery_efficiency_tumor
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_tumor/tumor_model:
 *     get:
 *       summary: Get details of the tumor_model and delivery_efficiency_tumor
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_tumor/organ_cancer_type:
 *     get:
 *       summary: Get details of the organ_cancer_type and delivery_efficiency_tumor
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/:
 *     get:
 *       summary: Get types of columsn for delivery_efficiency_heart
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/year_of_cited_record:
 *     get:
 *       summary: Get details of the year_of_cited_record and delivery_efficiency_heart
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/particle_type:
 *     get:
 *       summary: Get details of the particle_type and delivery_efficiency_heart
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/targeting_strategy:
 *     get:
 *       summary: Get details of the targeting_strategy and delivery_efficiency_heart
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/surface_charge:
 *     get:
 *       summary: Get details of the surface_charge and delivery_efficiency_heart
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/shape:
 *     get:
 *       summary: Get details of the shape and delivery_efficiency_heart
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/tumor_model:
 *     get:
 *       summary: Get details of the tumor_model and delivery_efficiency_heart
 *       tags: [Visualization]
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

/** 
 * @swagger
 *   /visualization/delivery_efficiency_heart/organ_cancer_type:
 *     get:
 *       summary: Get details of the organ_cancer_type and delivery_efficiency_heart
 *       tags: [Visualization]
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
router.get("/:delivery_efficiency/:column", async (req, res) => {
    try{
        const result = await visualizationdHandler.GetGraphData(req.params);
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
 *   /visualization/delivery_efficiency_tumor/year_of_cited_record:
 *     post:
 *       summary: Get details of year_of_cited_record and delivery_efficiency_tumor (filter)
 *       tags: [Visualization]
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
// (filter) graph display with filtered data         //not done
router.post("/:delivery_efficiency/:column", async (req, res) => {
    try{
        req.body.delivery_efficiency=req.params.delivery_efficiency;
        req.body.column=req.params.column;
        const result = await visualizationdHandler.GetFilteredDataForgraphs(req.body);
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
 *   /visualization/get-data:
 *     post:
 *       summary: Get details of year_of_cited_record and delivery_efficiency_tumor (filter)
 *       tags: [Visualization]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/nano_tumor_id_list'
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
router.post("/get-data", async (req, res) => {
    try{
        const result = await visualizationdHandler.GetDataForDownload(req.body);
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