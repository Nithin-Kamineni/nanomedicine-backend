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
 *   name: Users
 *   description: API to manage users
 */


// Define the storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    // Set the destination folder where the image will be saved
    cb(null, 'Assets/profile_images');
    },
    filename: function (req, file, cb) {
    // Set the filename of the uploaded image
    const customFileName = _.get(req, "auth.sub","|").replace("|","");
    const extension = path.extname(file.originalname);
    const filename = `${customFileName}${extension}`;
    //console.log(filename);
    cb(null, filename);
    }
});

const upload = multer({ storage: storage });





/** 
 * @swagger
 *   /user/details:
 *     get:
 *       summary: Get details of the user
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: The details of user based on token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.get("/details", async (req, res) => {
    try{
        const authSub = _.get(req, "auth.sub", "|");
        console.log(authSub)
        const result = await authHandler.GetUserDetails({auth0_id:authSub});
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
 *   /user/update:
 *     put:
 *       summary: Update details of the user
 *       tags: [Users]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userDetailsUpdateRequest'
 *       responses:
 *         "200":
 *           description: The updating the details of user based on token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.put("/update", async (req, res) => {
    try{
        //check only user attributes in req.body (no image)
        //
        const requestSchema = requestBodiesSchema.userDetailsUpdateRequest.fork(Object.keys(requestBodiesSchema.userDetailsUpdateRequest.describe().keys), (schema) => schema.optional());
        console.log(req.body)
        await requestSchema.validateAsync(req.body);

        const authSub = _.get(req, "auth.sub", "|");
        req.body.auth0_id=authSub;
        const result = await authHandler.UpdateUserDetails(req.body);
        res.status(result.status || StatusCodes.OK).send(result);
    }catch (err){
        console.log(`Cannot give what buckets based on intersections that are avilable. error: ${err}`);
        if (err instanceof BaseError) {
            return err.respondWithError(res);
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: `${err}`,
        });
    }
});


/** 
 * @swagger
 *   /user/update/image:
 *     put:
 *       summary: Update image of the user
 *       tags: [Users]
 *       requestForm:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userImageUpdateRequest'
 *       responses:
 *         "200":
 *           description: The updating the details of user based on token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.put("/update/image", upload.single('image'), async (req, res) => {
    try{
        //check only user image in req.body
        //  
        if (!req.file) {
            // No image file was provided
            return res.status(400).json({ error: 'No image file provided' });
          }
        const customFileName = _.get(req, "auth.sub","|").replace("|","");
        const extension = path.extname(req.file.originalname);
        req.body.auth0_id=_.get(req, "auth.sub","|");
        req.body.picture = `http://localhost:8080/Assets/profile_images/${customFileName}${extension}`;
        const result = await authHandler.UpdateUserPicture(req.body);
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
 *   /user/subscription-preference:
 *     get:
 *       summary: Get subscription details of the user
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: The details of user based on token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.get("/subscription-preference", async (req, res) => {
    try{
        //check only subscription attributes in req.body
        //

        const authSub = _.get(req, "auth.sub", "|");
        console.log(authSub)
        const result = await authHandler.GetSubscriptionPreference({auth0_id:authSub});
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
 *   /user/subscription-preference:
 *     post:
 *       summary: Update subscription details of the user
 *       tags: [Users]
 *       requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/userSubscriptionUpdateRequest'
 *       responses:
 *         "200":
 *           description: The updating the details of user based on token
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.post("/subscription-preference", async (req, res) => {
    try{
        //check only subscription attributes in req.body
        //
        const requestSchema = requestBodiesSchema.userSubscriptionUpdateRequest.fork(Object.keys(requestBodiesSchema.userSubscriptionUpdateRequest.describe().keys), (schema) => schema.optional());
        console.log(req.body)
        await requestSchema.validateAsync(req.body);

        const authSub = _.get(req, "auth.sub", "|");
        console.log(authSub)
        req.body.auth0_id=authSub;
        const result = await authHandler.UpdateSubscriptionPreference(req.body);
        res.status(result.status || StatusCodes.OK).send(result);
    }catch (err){
        console.log(`Cannot give what buckets based on intersections that are avilable. error: ${err}`);
        if (err instanceof BaseError) {
            return err.respondWithError(res);
        }
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            error: `${err}`,
        });
    }
});


/** 
 * @swagger
 *   /user/subscription-preference:
 *     delete:
 *       summary:  unsubscribe user
 *       tags: [Users]
 *       responses:
 *         "200":
 *           description: The details of user based on token
 *           contents:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           $ref: '#/components/responses/400'
 *         "401":
 *           $ref: '#/components/responses/401'
 */
router.delete("/subscription-preference", async (req, res) => {
    try{
        //check only subscription attributes in req.body
        //

        const authSub = _.get(req, "auth.sub", "|");
        console.log(authSub)
        const result = await authHandler.RemoveSubscriptionPreference({auth0_id:authSub});
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