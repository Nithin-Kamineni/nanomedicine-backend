"use strict";
const Joi = require("joi");

const filterNanoparticlesSchema = Joi.object({
  operation: Joi.string().required(),
  id: Joi.number(),
  nano_tumor_id: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  particle_type: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  core_material: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  targeting_strategy: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  nanomedicine_id: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  shape: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  pdi: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  size_tem: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  size_hd: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  zeta_potential: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  tumor_cell: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  tumor_size: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  np_administration: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  bw_np_administration: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  animal: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  reference: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  organ_cancer_type: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  tumor_model: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  sex: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  surface_charge: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  year_of_cited_record: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  tumor_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  administered_dose: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  strain: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  administered_position: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  delivery_efficiency_tumor: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  delivery_efficiency_heart: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  delivery_efficiency_liver: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  delivery_efficiency_spleen: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  delivery_efficiency_lung: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  delivery_efficiency_kidney: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  heart_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  liver_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  spleen_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  lung_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  kidney_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  blood_type: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  reference_hyperlink: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
  reference: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()})
});

const filterNanoAndBioSchema = Joi.object({
    operation: Joi.string().required(),
    id: Joi.number(),
    nano_tumor_id: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    particle_type: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    core_material: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    targeting_strategy: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    nanomedicine_id: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    shape: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    pdi: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    size_tem: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    size_hd: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    zeta_potential: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    tumor_cell: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    tumor_size: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    np_administration: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    bw_np_administration: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    animal: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    reference: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    organ_cancer_type: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    tumor_model: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    sex: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    surface_charge: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    year_of_cited_record: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    tumor_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    administered_dose: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    strain: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    administered_position: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    delivery_efficiency_tumor: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    delivery_efficiency_heart: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    delivery_efficiency_liver: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    delivery_efficiency_spleen: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    delivery_efficiency_lung: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    delivery_efficiency_kidney: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    heart_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    liver_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    spleen_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    lung_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    kidney_weight: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    reference_hyperlink: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    reference: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),

    time_point: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    tumor: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    heart: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    liver: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    spleen: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    lung: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    kidney: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    blood_type: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()}),
    tumor_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    tumor_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    heart_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    heart_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    liver_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    liver_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    spleen_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    spleen_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    lung_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    lung_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    kidney_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
    kidney_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
});

const updateFilterNanoAndBioSchema = filterNanoAndBioSchema.fork(["nano_tumor_id", "particle_type", "core_material", "targeting_strategy", "nanomedicine_id", 
"shape", "pdi", "size_tem", "size_hd", "zeta_potential", "tumor_cell", "tumor_size", "np_administration", "bw_np_administration", "animal", "reference", "time_point", 
"tumor", "heart", "liver", "spleen", "lung", "kidney", "blood_type"], (schema) => schema.optional());

const userDetailsUpdateRequest = Joi.object({
    company: Joi.string(),
    country: Joi.string(),
    phone_number: Joi.string(),
    linkedin_url: Joi.string()
});

const userImageUpdateRequest = Joi.object({
    image: Joi.object({
      fieldname: Joi.string().valid('image').required(),
      originalname: Joi.string().required(),
      encoding: Joi.string().required(),
      mimetype: Joi.string().valid('image/jpeg', 'image/png').required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      path: Joi.string().required(),
      size: Joi.number().required(),
    })
  });

  const userSubscriptionUpdateRequest = Joi.object({
    project_announcements_and_updates: Joi.boolean(),
    events_and_meetups: Joi.boolean(),
    user_research_surveys: Joi.boolean(),
});

const filterBloodData = Joi.object({
  operation: Joi.string().required(),
  time_point: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  plasma_id_pc: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()})
});

const filterBioDistributionSchema = Joi.object({
  operation: Joi.string().required(),
  id: Joi.number(),
  nano_tumor_id: Joi.array().items(Joi.number()),
  time_point: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  tumor: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  heart: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  liver: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  spleen: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  lung: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  kidney: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  tumor_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  tumor_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  heart_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  heart_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  liver_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  tumor_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  liver_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  spleen_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  spleen_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  lung_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  lung_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  kidney_id_percentage_g: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  kidney_id_percentage: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()})
});

const nano_tumor_id_list = Joi.object({
  nano_tumor_id_list: Joi.array().items(Joi.number())
});

const testSchema = Joi.object({
  a: Joi.array().items(Joi.string().allow(null)),
  b: Joi.object({min: Joi.number(), max: Joi.number(), includeNull: Joi.boolean()}),
  c: Joi.object({value: Joi.array().items(Joi.string()), includeNull: Joi.boolean()})
});


module.exports = {
  filterNanoparticlesSchema,
    filterNanoAndBioSchema,
    updateFilterNanoAndBioSchema,
    userDetailsUpdateRequest,
    userImageUpdateRequest,
    userSubscriptionUpdateRequest,
    filterBloodData,
    filterBioDistributionSchema,
    nano_tumor_id_list,
    testSchema
};