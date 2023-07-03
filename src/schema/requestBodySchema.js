"use strict";
const Joi = require("joi");

const filterNanoAndBioSchema = Joi.object({
    operation: Joi.string().required(),
    id: Joi.number(),
    nano_tumor_id: Joi.array().items(Joi.string()),
    particle_type: Joi.array().items(Joi.string()),
    core_material: Joi.array().items(Joi.string()),
    targeting_strategy: Joi.array().items(Joi.string()),
    nanomedicine_id: Joi.array().items(Joi.string()),
    shape: Joi.array().items(Joi.string()),
    pdi: Joi.array().length(2).items(Joi.number()),
    size_tem: Joi.array().length(2).items(Joi.number()),
    size_hd: Joi.array().length(2).items(Joi.number()),
    zeta_potential: Joi.array().length(2).items(Joi.number()),
    tumor_cell: Joi.array().items(Joi.string()),
    tumor_size: Joi.array().length(2).items(Joi.number()),
    np_administration: Joi.array().items(Joi.string()),
    bw_np_administration: Joi.array().length(2).items(Joi.number()),
    animal: Joi.array().items(Joi.string()),
    reference: Joi.array().items(Joi.string()),
    organ_cancer_type: Joi.array().items(Joi.string()),
    tumor_model: Joi.array().items(Joi.string()),
    sex: Joi.array().items(Joi.string()),
    surface_charge: Joi.array().items(Joi.string()),
    year_of_cited_record: Joi.array().length(2).items(Joi.number()),
    tumor_weight: Joi.array().length(2).items(Joi.number()),
    administered_dose: Joi.array().length(2).items(Joi.number()),
    strain: Joi.array().items(Joi.string()),
    administered_position: Joi.array().items(Joi.string()),
    delivery_efficiency_tumor: Joi.array().length(2).items(Joi.number()),
    delivery_efficiency_heart: Joi.array().length(2).items(Joi.number()),
    delivery_efficiency_liver: Joi.array().length(2).items(Joi.number()),
    delivery_efficiency_spleen: Joi.array().length(2).items(Joi.number()),
    delivery_efficiency_lung: Joi.array().length(2).items(Joi.number()),
    delivery_efficiency_kidney: Joi.array().length(2).items(Joi.number()),
    heart_weight: Joi.array().length(2).items(Joi.number()),
    liver_weight: Joi.array().length(2).items(Joi.number()),
    spleen_weight: Joi.array().length(2).items(Joi.number()),
    lung_weight: Joi.array().length(2).items(Joi.number()),
    kidney_weight: Joi.array().length(2).items(Joi.number()),

    time_point: Joi.array().length(2).items(Joi.number()),
    tumor: Joi.array().length(2).items(Joi.number()),
    heart: Joi.array().length(2).items(Joi.number()),
    liver: Joi.array().length(2).items(Joi.number()),
    spleen: Joi.array().length(2).items(Joi.number()),
    lung: Joi.array().length(2).items(Joi.number()),
    kidney: Joi.array().length(2).items(Joi.number()),
    blood_type: Joi.array().items(Joi.string()),
    tumor_id_percentage_g: Joi.array().length(2).items(Joi.number()),
    tumor_id_percentage: Joi.array().length(2).items(Joi.number()),
    heart_id_percentage_g: Joi.array().length(2).items(Joi.number()),
    heart_id_percentage: Joi.array().length(2).items(Joi.number()),
    liver_id_percentage_g: Joi.array().length(2).items(Joi.number()),
    liver_id_percentage: Joi.array().length(2).items(Joi.number()),
    spleen_id_percentage_g: Joi.array().length(2).items(Joi.number()),
    spleen_id_percentage: Joi.array().length(2).items(Joi.number()),
    lung_id_percentage_g: Joi.array().length(2).items(Joi.number()),
    lung_id_percentage: Joi.array().length(2).items(Joi.number()),
    kidney_id_percentage_g: Joi.array().length(2).items(Joi.number()),
    kidney_id_percentage: Joi.array().length(2).items(Joi.number()),
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
  time_point: Joi.array().length(2).items(Joi.number()),
  plasma_id_pc: Joi.array().length(2).items(Joi.number())
});

const filterBioDistributionSchema = Joi.object({
  operation: Joi.string().required(),
  id: Joi.number(),
  nano_tumor_id: Joi.array().items(Joi.number()),
  time_point: Joi.array().length(2).items(Joi.number()),
  tumor: Joi.array().length(2).items(Joi.number()),
  heart: Joi.array().length(2).items(Joi.number()),
  liver: Joi.array().length(2).items(Joi.number()),
  spleen: Joi.array().length(2).items(Joi.number()),
  lung: Joi.array().length(2).items(Joi.number()),
  kidney: Joi.array().length(2).items(Joi.number()),
  tumor_id_percentage_g: Joi.array().length(2).items(Joi.number()),
  tumor_id_percentage: Joi.array().length(2).items(Joi.number()),
  heart_id_percentage_g: Joi.array().length(2).items(Joi.number()),
  heart_id_percentage: Joi.array().length(2).items(Joi.number()),
  liver_id_percentage_g: Joi.array().length(2).items(Joi.number()),
  tumor_id_percentage_g: Joi.array().length(2).items(Joi.number()),
  liver_id_percentage: Joi.array().length(2).items(Joi.number()),
  spleen_id_percentage_g: Joi.array().length(2).items(Joi.number()),
  spleen_id_percentage: Joi.array().length(2).items(Joi.number()),
  lung_id_percentage_g: Joi.array().length(2).items(Joi.number()),
  lung_id_percentage: Joi.array().length(2).items(Joi.number()),
  kidney_id_percentage_g: Joi.array().length(2).items(Joi.number()),
  kidney_id_percentage: Joi.array().length(2).items(Joi.number())
});


module.exports = {
    filterNanoAndBioSchema,
    updateFilterNanoAndBioSchema,
    userDetailsUpdateRequest,
    userImageUpdateRequest,
    userSubscriptionUpdateRequest,
    filterBloodData,
    filterBioDistributionSchema
};