const express = require("express");
const http = require("http");
const { StatusCodes } = require("http-status-codes");
const BaseError = require("../../lib/error/BaseError");
const authHandler = require("../../handlers/AuthHandler"); 
const router = new express.Router();
const _ = require("lodash");
const multer = require('multer');
const path = require('path');


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

router.put("/update", async (req, res) => {
    try{
        //check only user attributes in req.body (no image)
        //

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
            error: "Server Error",
        });
    }
});

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

router.post("/subscription-preference", async (req, res) => {
    try{
        //check only subscription attributes in req.body
        //

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
            error: "Server Error",
        });
    }
});

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