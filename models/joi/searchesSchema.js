const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    question: Joi.object({
        amount: Joi.number().integer().min(1).max(50).optional()
    }),
    id: Joi.object({
        id: Joi.objectId(),
    }),
    create: Joi.object({
        userID: Joi.objectId().required(),
        date: Joi.date().required(),
    }),
    update: Joi.object({
        userID: Joi.objectId().optional(),
        time: Joi.date().optional(),
    }),
    date: Joi.object({
        start: Joi.date().required(),
        end: Joi.date().required(),
    })
};