"use strict";
const Joi = require("joi");

const filterNanoAndBioSchema = Joi.object({
    operation: Joi.string().required(),
    id: Joi.number(),
    nano_tumor_id: Joi.array().items(Joi.string()),
    particle_type: Joi.array().items(Joi.string()),
    core_material: Joi.array().items(Joi.string()),
    targeting_stratergy: Joi.array().items(Joi.string()),
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
    time_point: Joi.array().length(2).items(Joi.number()),
    tumor: Joi.array().length(2).items(Joi.number()),
    heart: Joi.array().length(2).items(Joi.number()),
    liver: Joi.array().length(2).items(Joi.number()),
    spleen: Joi.array().length(2).items(Joi.number()),
    lung: Joi.array().length(2).items(Joi.number()),
    kidney: Joi.array().length(2).items(Joi.number())
});

const updateFilterNanoAndBioSchema = filterNanoAndBioSchema.fork(["nano_tumor_id", "particle_type", "core_material", "targeting_stratergy", "nanomedicine_id", 
"shape", "pdi", "size_tem", "size_hd", "zeta_potential", "tumor_cell", "tumor_size", "np_administration", "bw_np_administration", "animal", "reference", "time_point", 
"tumor", "heart", "liver", "spleen", "lung", "kidney" ], (schema) => schema.optional());

module.exports = {
    filterNanoAndBioSchema,
    updateFilterNanoAndBioSchema,
};