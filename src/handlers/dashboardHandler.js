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

module.exports.GetNanoparticlesColumns = async () =>{
    // options have parameters of get request
    let dataRecords = await nanoparticlesdbAccessor.selectColumnNames();
    console.log(dataRecords);
    return dataRecords;
};

// sprint 1
module.exports.GetNanoparticles = async (options) =>{
    // options have parameters of get request
    let dataRecords = await nanoparticlesdbAccessor.selectAll(options);
    console.log(dataRecords);
    return dataRecords;
};

module.exports.GetFilterParamsForNanoparticles = async () =>{
    // options have contents/body of post request
    let dataRecords = await nanoparticlesdbAccessor.columnAndParameters();
    console.log(dataRecords);
    return dataRecords;
};

module.exports.GetFilteredDataNanoparticles = async (options) =>{

    //check the parameted in the body(options)

    // options have parameters of get request
    let dataRecords = await nanoparticlesdbAccessor.filterAndSelectBasedOnParams(options);
    // console.log(dataRecords);
    return dataRecords;
};
/////////////////////////////////////////////////////////////////////


module.exports.GetBiodistributionTimelinesColumns = async () =>{
    // options have parameters of get request
    let dataRecords = await biodistributionDbAccessor.selectColumnNames();
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

// filter params for biodistribution
module.exports.GetFilterParamsForBiodistributionTimelines = async () =>{
    // options have contents/body of post request
    let dataRecords = await biodistributionDbAccessor.columnAndParameters();
    console.log(dataRecords);
    return dataRecords;
};

// filtered data for biodistribution
module.exports.GetFilteredDataForBiodistributionTimelines = async (options) =>{

    const requestSchema = requestBodiesSchema.filterBioDistributionSchema.fork(Object.keys(requestBodiesSchema.filterBioDistributionSchema.describe().keys), (schema) => schema.optional());
    console.log(options)
    await requestSchema.validateAsync(options);

    // options have contents/body of post request
    let dataRecords = await biodistributionDbAccessor.filterAndSelectBasedOnParams(options);
    console.log(dataRecords);
    return dataRecords;
};


//////////////////////////////////////////////////////////////////

// columns for table 3
module.exports.GetColumnsForBloodData = async () =>{
    // options have contents/body of post request
    let dataRecords = await bloodDataDbAccessor.selectColumnNames();
    // console.log(dataRecords);
    return dataRecords;
};

// select all blood data
module.exports.GetBloodDataTimelines = async (options) =>{
    // options have contents/body of post request
    let dataRecords = await bloodDataDbAccessor.selectAll(options);
    console.log(dataRecords);
    return dataRecords;
};

// filter params
module.exports.GetFilterParamsForBloodData = async () =>{
    // options have contents/body of post request
    let dataRecords = await bloodDataDbAccessor.columnAndParameters();
    // console.log(dataRecords);
    return dataRecords;
};

// filter blooddata
module.exports.GetFilteredDataForBloodData = async (options) =>{
    // options have contents/body of post request
    
    const requestSchema = requestBodiesSchema.filterBloodData.fork(Object.keys(requestBodiesSchema.filterBloodData.describe().keys), (schema) => schema.optional());
    console.log(options)
    await requestSchema.validateAsync(options);

    let dataRecords = await bloodDataDbAccessor.filterAndSelectBasedOnParams(options);
    // console.log(dataRecords);
    return dataRecords;
};

// insert blooddata
module.exports.InsertDataForBloodData = async (options) =>{
    // options have contents/body of post request
    
    // const requestSchema = requestBodiesSchema.filterBloodData.fork(Object.keys(requestBodiesSchema.filterBloodData.describe().keys), (schema) => schema.optional());
    // console.log(options)
    // await requestSchema.validateAsync(options);
    
    let dataRecords = await bloodDataDbAccessor.insert(options);
    console.log(dataRecords);
    return dataRecords;
};

// columns for table 1 and 2
module.exports.GetColumnsForNanoparticlesAndBiodistributionTimelines = async () =>{
    // options have contents/body of post request
    let dataRecords = await nanoparticlesAndbloodDataDbAccessor.selectColumnNames();
    console.log(dataRecords);
    return dataRecords;
};

// insert for table 1 and 2
module.exports.AddNanoparticlesAndBiodistributionTimelines = async (options) =>{
    // options have contents/body of post request

    let nanoparticlesRecord = {"nano_tumor_id":options.nano_tumor_id, "particle_type":options.particle_type, "core_material":options.core_material, "targeting_strategy":options.targeting_strategy,
                                "nanomedicine_id":options.nanomedicine_id, "shape":options.shape, "pdi":options.pdi, "size_tem":options.size_tem, "size_hd":options.size_hd, "zeta_potential":options.zeta_potential,
                                "tumor_cell":options.tumor_cell, "tumor_size":options.tumor_size, "np_administration":options.np_administration, "bw_np_administration":options.bw_np_administration,
                                "animal":options.animal, "reference":options.reference, "blood_type":options.blood_type, "reference_hyperlink":options.reference_hyperlink};
    let dataRecords1 = await nanoparticlesdbAccessor.insert(nanoparticlesRecord);
    
    let biodistributionRecord = {"nano_tumor_id":options.nano_tumor_id, "time_point":options.time_point, "tumor":options.tumor, "heart":options.heart, 
                                "liver":options.liver, "spleen":options.spleen, "lung":options.lung, "kidney":options.kidney};
    let dataRecords2 = await biodistributionDbAccessor.insert(biodistributionRecord);
    return {"nanoparticles": dataRecords1, "biodistribution": dataRecords2};
};

// select all for table 1 and 2
module.exports.GetNanoparticlesAndBiodistributionTimelines = async (options) =>{
    // options have contents/body of post request
    let dataRecords = await nanoparticlesAndbloodDataDbAccessor.selectAll(options);
    console.log(dataRecords);
    return dataRecords;
};


// filter parameters
module.exports.GetFilteredParamsOfNanoparticlesAndBiodistributionTimelines = async (options) =>{
    
    // options have contents/body of post request
    let dataRecords = await nanoparticlesAndbloodDataDbAccessor.filterParamsForNanoAndBio(options);
    // console.log(dataRecords);
    return dataRecords;
};

// filter the data
module.exports.GetFilteredNanoparticlesAndBiodistributionTimelines = async (options) =>{
    
    const requestSchema = requestBodiesSchema.filterNanoAndBioSchema.fork(Object.keys(requestBodiesSchema.filterNanoAndBioSchema.describe().keys), (schema) => schema.optional());
    console.log(options)
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