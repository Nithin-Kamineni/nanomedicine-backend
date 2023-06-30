const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../lib/error/BaseError");
const authHandler = require("../../handlers/AuthHandler"); 
const router = new express.Router();
const _ = require("lodash");
const multer = require('multer');
const path = require('path');
const requestBodiesSchema = require('../../schema/requestBodySchema')

/**
 * @swagger
 * tags:
 *   name: Visualization
 *   description: API to manage dashbaord
 */

/** 
 * @swagger
 *   /visualization:
 *     get:
 *       summary: Get data for the nanoparticles
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
// (column names) nanoparticles
router.get("/", async (req, res) => {
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