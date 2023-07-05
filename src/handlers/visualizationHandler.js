const _ = require('lodash');
const NanoparticlesDbAccessor = require("../dbAccessor/NanoparticlesDbAccessor");
const nanoparticlesdbAccessor = new NanoparticlesDbAccessor();

const requestBodiesSchema = require('../schema/requestBodySchema')

module.exports.GetTypesOfDeliveryEfficiency = async () =>{
    // options have parameters of get request
    return {"TypesOfDeliveryEfficiency":["delivery_efficiency_tumor", "delivery_efficiency_heart", "delivery_efficiency_liver", "delivery_efficiency_spleen", "delivery_efficiency_lung", "delivery_efficiency_kidney"]};
};

module.exports.GetTypesOfColumns = async () =>{
    // options have parameters of get request
    return {"TypesOfColumns":["year_of_cited_record", "particle_type", "targeting_strategy", "surface_charge", "shape", "tumor_model", "organ_cancer_type", "inorganic_material", "organic_material"]};
};

// sprint 1
module.exports.GetGraphData = async (options) =>{
    // options have parameters of get request
    let dataRecords = await nanoparticlesdbAccessor.selectAllGraphData();
    const pickedKeys = [
        'nano_tumor_id',
        options.delivery_efficiency,
        options.column
      ];
    dataRecords = _.map(dataRecords, obj => {
        const pickedObj = _.pick(obj, pickedKeys);
        if (_.isEqual(_.keys(pickedObj), pickedKeys)) {
            return pickedObj;
          }
        }); 

    dataRecords = dataRecords.filter(value => value !== undefined);
    console.log(dataRecords);
    return dataRecords;
};

module.exports.GetFilterParamsForGraphs = async () =>{
    // options have contents/body of post request
    let dataRecords = await nanoparticlesdbAccessor.columnAndParameters();
    console.log("-------------------------------------------------")
    console.log(dataRecords);
    return dataRecords;
};

module.exports.GetFilteredDataForgraphs = async (options) =>{

    //check the parameted in the body(options)
    const pickedKeys = [
        'nano_tumor_id',
        options.delivery_efficiency,
        options.column
      ];

    options = _.omit(options, ['delivery_efficiency', 'column']);

    const requestSchema = requestBodiesSchema.filterNanoparticlesSchema.fork(Object.keys(requestBodiesSchema.filterNanoparticlesSchema.describe().keys), (schema) => schema.optional());
    console.log(options)
    await requestSchema.validateAsync(options);

    // options have parameters of get request
    let dataRecords = await nanoparticlesdbAccessor.filterAndSelectBasedOnParams(options);

    dataRecords = _.map(dataRecords, obj => {
        const pickedObj = _.pick(obj, pickedKeys);
        if (_.isEqual(_.keys(pickedObj), pickedKeys)) {
            return pickedObj;
          }
        }); 

    dataRecords = dataRecords.filter(value => value !== undefined);
    console.log(dataRecords);
    return dataRecords;
};

module.exports.GetDataForDownload = async (options) =>{
    //check the parameted in the body(options)
    const requestSchema = requestBodiesSchema.nano_tumor_id_list.fork(Object.keys(requestBodiesSchema.nano_tumor_id_list.describe().keys), (schema) => schema.optional());
    console.log(options)
    await requestSchema.validateAsync(options);
    options=options.nano_tumor_id_list;
    console.log(options)
    let dataRecords = [];
    for (let i = 0; i < options.length; i++) {
      dataRecords.push(await nanoparticlesdbAccessor.selectById(options[i])); 
    }

    console.log(dataRecords);
    return dataRecords;
};