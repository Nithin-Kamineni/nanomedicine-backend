"use strict";
const Joi = require("joi");

const userSchema = Joi.object({
    id: Joi.number().integer(),
    auth0_id: Joi.string().required(),
    username: Joi.string(),
    email: Joi.string().email(),
    auth0_app_metedata: Joi.object({ }).unknown(true),
});

const updateUserSchema = userSchema.fork(["auth0_id", "username", "auth0_app_metedata"], (schema) => schema.optional());

const s3bucketsSchema = Joi.object({
    id: Joi.number().required(),
    bucket_name: Joi.string(),
    expanded_name: Joi.string(),
    aws_region: Joi.string(),
    description: Joi.string(),
    latest_updated: Joi.object()
});

const updateS3bucketsSchema = s3bucketsSchema.fork(["bucket_name", "expanded_name", "aws_region", "description", "latest_updated"], (schema) => schema.optional());

const fileKeyPathsSchema = Joi.object({
    id: Joi.number().required(),
    bucket_name: Joi.string(),
    file_name: Joi.string(),
    file_path: Joi.string(),
    intersection: Joi.string(),
    file_date: Joi.date()
});

const updatefileKeyPathsSchema = fileKeyPathsSchema.fork(["bucket_name", "file_name", "file_path", "intersection", "file_date"], (schema) => schema.optional());

const s3bucketFilePathsShema = Joi.object({
    id: Joi.number().required(),
    bucket_name: Joi.string().required(),
    file_path: Joi.string().required(),
    intersection: Joi.string(),
    file_date: Joi.date(),
    created_on: Joi.date().required(),
});

const updateS3bucketFilePathsSchema = s3bucketFilePathsShema.fork(["bucket_name", "file_path", "intersection", "file_date", "created_on"], (schema) => schema.optional());

const permanenetStationsSchema= Joi.object({
    id: Joi.number().required(),
    county: Joi.number(),
    county_name: Joi.string(),
    site: Joi.string(),
    direction: Joi.string(),
    file_name: Joi.string(),
    file_path: Joi.string(),
    file_date: Joi.date()
});

const updatepermanentSchema = permanenetStationsSchema.fork(["county", "county_name", "site", "direction", "file_name", "file_date"], (schema) => schema.optional());

const tmcCodeDataSchema= Joi.object({
    id: Joi.number().required(),
    tmc_code: Joi.string(),
    measurement_tstamp: Joi.date(),
    travel_time_seconds: Joi.number(),
});

const updatedtmcCodeDataSchema= tmcCodeDataSchema.fork(["tmc_code", "measurement_tstamp", "travel_time_seconds"], (schema) => schema.optional());

module.exports = {
    userSchema,
    updateUserSchema,
    s3bucketsSchema,
    updateS3bucketsSchema,
    fileKeyPathsSchema,
    updatefileKeyPathsSchema,
    permanenetStationsSchema,
    updatepermanentSchema,
    tmcCodeDataSchema,
    updatedtmcCodeDataSchema
};