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
    let searchMap = {inorganic_material:"INM", organic_material:"ONM"};
    let AllParamAllowMaterialMap = {inorganic_material: ['Gold','Iron Oxide','Silica'], organic_material: ['Polymeric','Dendrimer','Hydrogel','Liposome']}
    let paramAllowMaterialMap=false;
    let dataRecords;
    let pickedKeys;
    // core material change here
    if(options.column=='inorganic_material' || options.column=='organic_material'){
      // options have parameters of get request
      dataRecords = await nanoparticlesdbAccessor.filterAndSelect({particle_type:searchMap[options.column]});
      paramAllowMaterialMap = AllParamAllowMaterialMap[options.column];
      options.column='core_material';
      pickedKeys = [
          'nano_tumor_id',
          options.delivery_efficiency,
          options.column
        ];
    } 
    else{
      // options have parameters of get request
    dataRecords = await nanoparticlesdbAccessor.selectAllGraphData();
    pickedKeys = [
        'nano_tumor_id',
        options.delivery_efficiency,
        options.column
      ];
    }
    dataRecords = _.map(dataRecords, obj => {
      const pickedObj = _.pick(obj, pickedKeys);
      if (_.isEqual(_.keys(pickedObj), pickedKeys)) {
          return pickedObj;
        }
      }); 
    dataRecords = dataRecords.filter(value => value !== undefined);

    let nano_tumor_ids = [];
    let delivery_efficiencies = [];
    let column_values = [];
    dataRecords.forEach(item => {
      nano_tumor_ids.push(item['nano_tumor_id']);
      delivery_efficiencies.push(item[options.delivery_efficiency]);
      column_values.push(item[options.column]);
    });
    let regex;
    let columns_DE = {};
    let flagHit=true;
    // console.log(/\bIron Oxide\b/i.test("This contains Iron Oxide"))
    if(paramAllowMaterialMap){
      for(let i=0;i<delivery_efficiencies.length;i++){
        flagHit=true;
        for(let j=0;j<paramAllowMaterialMap.length;j++){
          regex = new RegExp('\\b' + paramAllowMaterialMap[j].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
          if(regex.test(column_values[i])){
            flagHit=false
            if(!columns_DE.hasOwnProperty(paramAllowMaterialMap[j])){
              columns_DE[paramAllowMaterialMap[j]]=[];
            }
            columns_DE[paramAllowMaterialMap[j]].push(delivery_efficiencies[i]);
          }
        }
        if(flagHit) {
          if(!columns_DE.hasOwnProperty('Other')){
            columns_DE['Other']=[]
          }
          columns_DE['Other'].push(delivery_efficiencies[i])
        }
      }
    } else {
      for(let i=0;i<delivery_efficiencies.length;i++){
        // console.log(column_values[i]);
        if(!columns_DE.hasOwnProperty(column_values[i].toString())){
          columns_DE[column_values[i].toString()]=[]
        }
        columns_DE[column_values[i].toString()].push(delivery_efficiencies[i])
      }
    }

    for(let column in columns_DE){
      let sortedNumbers = columns_DE[column].sort();
      let length = sortedNumbers.length;
      let start = sortedNumbers[0];
      let index25 = Math.floor(length * 0.25);
      let index50 = Math.floor(length * 0.5);
      let index75 = Math.floor(length * 0.75);
      let end = sortedNumbers[length - 1];
      let quartile25 = sortedNumbers[index25];
      let median = sortedNumbers[index50];
      let quartile75 = sortedNumbers[index75];
      columns_DE[column]=[start,quartile25,median,quartile75,end];
    }


    return {columns_Delivary_Efficiency:columns_DE, nano_tumor_ids:nano_tumor_ids};
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
    let delivery_efficiency = options.delivery_efficiency; //update down
    let column = options.column;  //update down
    let searchMap = {inorganic_material:"INM", organic_material:"ONM"};
    let AllParamAllowMaterialMap = {inorganic_material: ['Gold','Iron Oxide','Silica'], organic_material: ['Polymeric','Dendrimer','Hydrogel','Liposome']}
    let paramAllowMaterialMap=false;
    let dataRecords;
    let pickedKeys;
    if(options.column=='inorganic_material' || options.column=='organic_material'){
      options = _.omit(options, ['delivery_efficiency', 'column']);
      const requestSchema = requestBodiesSchema.filterNanoparticlesSchema.fork(Object.keys(requestBodiesSchema.filterNanoparticlesSchema.describe().keys), (schema) => schema.optional());
      console.log(options)
      await requestSchema.validateAsync(options);

      // options have parameters of get request
      options.particle_type = {};
      options.particle_type.value=[searchMap[column]];

      dataRecords = await nanoparticlesdbAccessor.filterAndSelectBasedOnParams(options);

      paramAllowMaterialMap = AllParamAllowMaterialMap[column];
      column='core_material';
      pickedKeys = [
          'nano_tumor_id',
          delivery_efficiency,
          column
        ];
    } 
    else{
      // options have parameters of get request
      options = _.omit(options, ['delivery_efficiency', 'column']);

      const requestSchema = requestBodiesSchema.filterNanoparticlesSchema.fork(Object.keys(requestBodiesSchema.filterNanoparticlesSchema.describe().keys), (schema) => schema.optional());
      console.log(options)
      await requestSchema.validateAsync(options);
  
      // options have parameters of get request
      dataRecords = await nanoparticlesdbAccessor.filterAndSelectBasedOnParams(options);
      pickedKeys = [
        'nano_tumor_id',
        delivery_efficiency,
        column
      ];
    }

    

    dataRecords = _.map(dataRecords, obj => {
        const pickedObj = _.pick(obj, pickedKeys);
        if (_.isEqual(_.keys(pickedObj), pickedKeys)) {
            return pickedObj;
          }
        }); 

    dataRecords = dataRecords.filter(value => value !== undefined);
    
    let nano_tumor_ids = [];
    let delivery_efficiencies = [];
    let column_values = [];
    dataRecords.forEach(item => {
      nano_tumor_ids.push(item['nano_tumor_id']);
      delivery_efficiencies.push(item[delivery_efficiency]);
      column_values.push(item[column]);
    });

    let regex;
    let columns_DE = {};
    let flagHit=true;
    // console.log("------------------------------------")
    if(paramAllowMaterialMap){
      for(let i=0;i<delivery_efficiencies.length;i++){
        flagHit=true;
        for(let j=0;j<paramAllowMaterialMap.length;j++){
          regex = new RegExp('\\b' + paramAllowMaterialMap[j].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
          if(regex.test(column_values[i])){
            flagHit=false
            if(!columns_DE.hasOwnProperty(paramAllowMaterialMap[j])){
              columns_DE[paramAllowMaterialMap[j]]=[];
            }
            columns_DE[paramAllowMaterialMap[j]].push(delivery_efficiencies[i]);
          }
        }
        if(flagHit) {
          if(!columns_DE.hasOwnProperty('Other')){
            columns_DE['Other']=[]
          }
          columns_DE['Other'].push(delivery_efficiencies[i])
        }
      }
    } else {
      for(let i=0;i<delivery_efficiencies.length;i++){
        // console.log(column_values[i]);
        if(!columns_DE.hasOwnProperty(column_values[i].toString())){
          columns_DE[column_values[i].toString()]=[]
        }
        columns_DE[column_values[i].toString()].push(delivery_efficiencies[i])
      }
    }

    for(let column in columns_DE){
      let sortedNumbers = columns_DE[column].sort();
      let length = sortedNumbers.length;
      let start = sortedNumbers[0];
      let index25 = Math.floor(length * 0.25);
      let index50 = Math.floor(length * 0.5);
      let index75 = Math.floor(length * 0.75);
      let end = sortedNumbers[length - 1];
      let quartile25 = sortedNumbers[index25];
      let median = sortedNumbers[index50];
      let quartile75 = sortedNumbers[index75];
      columns_DE[column]=[start,quartile25,median,quartile75,end];
    }


    return {columns_Delivary_Efficiency:columns_DE, nano_tumor_ids:nano_tumor_ids};
    
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