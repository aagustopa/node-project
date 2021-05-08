const Joi = require('joi');

module.exports = {
    create: Joi.object({
        username: Joi.string().alphanum().min(2).max(20).required(),
        password: Joi.string().alphanum().min(2).max(20).required()
    }),
    login: Joi.object({
        username: Joi.string().alphanum().min(2).max(20).required(),
        password: Joi.string().alphanum().min(2).max(20).required()
    })
}