"use strict";
const NanoparticlesDbAccessor = require("../dbAccessor/NanoparticlesDbAccessor");
const nanoparticlesdbAccessor = new NanoparticlesDbAccessor();
const BiodistributionTimelinesDbAccessor = require("../dbAccessor/BiodistributionTimelinesDbAccessor");
const biodistributionDbAccessor = new BiodistributionTimelinesDbAccessor();
const BloodDataTimelinesDbAccessor = require("../dbAccessor/BloodDataTimelinesDbAccessor");
const bloodDataDbAccessor = new BloodDataTimelinesDbAccessor();

const NanoparticlesAndBBloodDataTimelinesDbAccessor = require("../dbAccessor/NanoparticlesAndBiodistributionDbAccessor");
const nanoparticlesAndbloodDataDbAccessor = new NanoparticlesAndBBloodDataTimelinesDbAccessor();

const requestBodiesSchema = require('../schema/requestBodySchema')

// sprint 1
module.exports.GetNanoparticles = async (options) =>{
    // options have parameters of get request
    let dataRecords = await nanoparticlesdbAccessor.selectAll(options);
    console.log(dataRecords);
    return dataRecords;
};

// sprint 1
module.exports.GetBiodistributionTimelines = async (options) =>{
    // options have contents/body of post request
    let dataRecords = await biodistributionDbAccessor.selectAll(options);
    console.log(dataRecords);
    return dataRecords;
};

// sprint 1
module.exports.GetBloodDataTimelines = async (options) =>{
    // options have contents/body of post request
    let dataRecords = await bloodDataDbAccessor.selectAll(options);
    console.log(dataRecords);
    return dataRecords;
};

// sprint 2
module.exports.GetNanoparticlesAndBiodistributionTimelines = async (options) =>{
    // options have contents/body of post request
    let dataRecords = await nanoparticlesAndbloodDataDbAccessor.selectAll(options);
    console.log(dataRecords);
    return dataRecords;
};

// filter sprint 2
module.exports.GetFilteredNanoparticlesAndBiodistributionTimelines = async (options) =>{
    
    const requestSchema = requestBodiesSchema.filterNanoAndBioSchema.fork(Object.keys(requestBodiesSchema.filterNanoAndBioSchema.describe().keys), (schema) => schema.optional());
    
    await requestSchema.validateAsync(options);
    
    // options have contents/body of post request
    let dataRecords = await nanoparticlesAndbloodDataDbAccessor.filterAndSelect(options);
    console.log(dataRecords);
    return dataRecords;
};

// sprint 2
module.exports.GetNanoparticlesBiodistributionTimelinesAndBloodDataTimelines = async (options) =>{
    // options have contents/body of post request
    let buckets = await bloodDataDbAccessor.selectAll(options);
    console.log(options);
    return {"test":"post"};
};

//filter sprint 2
module.exports.GetFilteredNanoparticlesBiodistributionTimelinesAndBloodDataTimelines = async (options) =>{
    // options have contents/body of post request
    let buckets = await bloodDataDbAccessor.selectAll(options);
    console.log(options);
    return {"test":"post"};
};