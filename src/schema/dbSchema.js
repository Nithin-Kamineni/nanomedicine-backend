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

const nanoparticlesSchema = Joi.object({
    id: Joi.number().required(),
    nano_tumor_id: Joi.string(),
    particle_type: Joi.string(),
    core_material: Joi.string(),
    targeting_stratergy: Joi.string(),
    nanomedicine_id: Joi.string(),
    shape: Joi.string(),
    pdi: Joi.number(),
    size_tem: Joi.number(),
    size_hd: Joi.number(),
    zeta_potential: Joi.number(),
    tumor_cell: Joi.string(),
    tumor_size: Joi.object(),
    np_administration: Joi.string(),
    bw_np_administration: Joi.object(),
    animal: Joi.string(),
    reference: Joi.string(),
});

const updateNanoparticlesSchema = nanoparticlesSchema.fork(["nano_tumor_id", "particle_type", "core_material", "targeting_stratergy", "nanomedicine_id", 
"shape", "pdi", "size_tem", "size_hd", "zeta_potential", "tumor_cell", "tumor_size", "np_administration", "bw_np_administration", "animal", "reference" ], (schema) => schema.optional());

const biodistributionTimelinesScehma = Joi.object({
    id: Joi.number().required(),
    nano_tumor_id: Joi.string(),
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
    id: Joi.number().required(),
    nano_tumor_id: Joi.string(),
    time_point: Joi.number(),
    plasma_id_pc: Joi.number(),
});

const updateBloodDataTimlinesSchema = bloodDataTimlinesSchema.fork(["nano_tumor_id", "time_point", "plasma_id_pc"], (schema) => schema.optional());

module.exports = {
    userSchema,
    updateUserSchema,
    nanoparticlesSchema,
    updateNanoparticlesSchema,
    biodistributionTimelinesScehma,
    updateBiodistributionTimelinesSchema,
    bloodDataTimlinesSchema,
    updateBloodDataTimlinesSchema
};