const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    create: Joi.object({
        username: Joi.string().alphanum().min(2).max(20).required(),
        password: Joi.string().alphanum().min(2).max(20).required()
    }),
    login: Joi.object({
        username: Joi.string().alphanum().min(2).max(20).required(),
        password: Joi.string().alphanum().min(2).max(20).required()
    }),
    generateToken: Joi.object({
        username: Joi.string().alphanum().min(2).max(20).required(),
        password: Joi.string().alphanum().min(2).max(20).required()
    }),
    id: Joi.object({
        id: Joi.objectId()
    }),
    update: Joi.object({
        username: Joi.string().alphanum().min(2).max(20),
        password: Joi.string().alphanum().min(2).max(20)
    }),
}