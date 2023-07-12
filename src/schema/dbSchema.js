"use strict";
const Joi = require("joi");

const userSchema = Joi.object({
    id: Joi.number().integer(),
    auth0_id: Joi.string().required(),
    username: Joi.string(),
    picture: Joi.string(),
    email: Joi.string().email(),
    auth0_app_metadata: Joi.object({ }).unknown(true),
    company: Joi.string(),
    phone_number: Joi.string(),
    country: Joi.string(),
    linkedin_url: Joi.string(),
    project_announcements_and_updates: Joi.boolean(),
    events_and_meetups: Joi.boolean(),
    user_research_surveys: Joi.boolean()
});

const updateUserSchema = userSchema.fork(["auth0_id", "username", "auth0_app_metadata","picture","company", "phone_number", "country", "linkedin_url","project_announcements_and_updates","events_and_meetups","user_research_surveys"], (schema) => schema.optional());

const nanoparticlesSchema = Joi.object({
    id: Joi.number(),
    nano_tumor_id: Joi.number(),
    particle_type: Joi.string(),
    core_material: Joi.string(),
    targeting_strategy: Joi.string(),
    nanomedicine_id: Joi.string(),
    shape: Joi.string(),
    pdi: Joi.number(),
    size_tem: Joi.number(),
    size_hd: Joi.number(),
    zeta_potential: Joi.number(),
    tumor_cell: Joi.string(),
    tumor_size: Joi.object({
        min: Joi.number(),
        max: Joi.number()
    }),
    np_administration: Joi.string(),
    bw_np_administration: Joi.object({
        min: Joi.number(),
        max: Joi.number()
    }),
    animal: Joi.string(),
    blood_type: Joi.string(),
    reference: Joi.string(),
    reference_hyperlink: Joi.string(),
});

const updateNanoparticlesSchema = nanoparticlesSchema.fork(["nano_tumor_id", "particle_type", "core_material", "targeting_strategy", "nanomedicine_id", "shape", "pdi", "size_tem", 
"size_hd", "zeta_potential", "tumor_cell", "tumor_size", "np_administration", "bw_np_administration", "animal", "reference", "reference_hyperlink" ], (schema) => schema.optional());

const biodistributionTimelinesScehma = Joi.object({
    id: Joi.number(),
    nano_tumor_id: Joi.number(),
    time_point: Joi.number(),
    tumor: Joi.number(),
    heart: Joi.number(),
    liver: Joi.number(),
    spleen: Joi.number(),
    lung: Joi.number(),
    kidney: Joi.number(),
});

const updateBiodistributionTimelinesSchema = biodistributionTimelinesScehma.fork(["nano_tumor_id", "time_point", "tumor", "heart", "liver", "spleen", "lung", "kidney"], (schema) => schema.optional());

const bloodDataTimlinesSchema = Joi.object({
    id: Joi.number(),
    nano_tumor_id: Joi.number(),
    time_point: Joi.number(),
    plasma_id_pc: Joi.number(),
});

const updateBloodDataTimlinesSchema = bloodDataTimlinesSchema.fork(["nano_tumor_id", "time_point", "plasma_id_pc"], (schema) => schema.optional());

const nanoparticlesAndBiodistributionTimelinesSchema = Joi.object({
    nano_tumor_id: Joi.number(),
    particle_type: Joi.string(),
    core_material: Joi.string(),
    targeting_strategy: Joi.string(),
    nanomedicine_id: Joi.string(),
    shape: Joi.string(),
    pdi: Joi.number(),
    size_tem: Joi.number(),
    size_hd: Joi.number(),
    zeta_potential: Joi.number(),
    tumor_cell: Joi.string(),
    tumor_size: Joi.object({
        min: Joi.number(),
        max: Joi.number()
    }),
    np_administration: Joi.string(),
    bw_np_administration: Joi.object({
        min: Joi.number(),
        max: Joi.number()
    }),
    animal: Joi.string(),
    blood_type: Joi.string(),
    reference: Joi.string(),
    reference_hyperlink: Joi.string(),
    time_point: Joi.number(),
    tumor: Joi.number(),
    heart: Joi.number(),
    liver: Joi.number(),
    spleen: Joi.number(),
    lung: Joi.number(),
    kidney: Joi.number()
})

const updateNanoparticlesAndBiodistributionTimelinesSchema = nanoparticlesAndBiodistributionTimelinesSchema.fork(
["nano_tumor_id", "particle_type", "core_material", "targeting_strategy", "nanomedicine_id", "shape", 
"pdi", "size_tem", "size_hd", "zeta_potential", "tumor_cell", "tumor_size", "np_administration", "bw_np_administration", 
"animal", "reference", "time_point", "tumor", "heart", "liver", "spleen", "lung", "kidney" ], (schema) => schema.optional());

module.exports = {
    userSchema,
    updateUserSchema,
    nanoparticlesSchema,
    updateNanoparticlesSchema,
    biodistributionTimelinesScehma,
    updateBiodistributionTimelinesSchema,
    bloodDataTimlinesSchema,
    updateBloodDataTimlinesSchema,
    nanoparticlesAndBiodistributionTimelinesSchema,
    updateNanoparticlesAndBiodistributionTimelinesSchema
};