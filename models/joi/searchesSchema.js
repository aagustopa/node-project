const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
    getAll: Joi.object({
        _id: Joi.objectId().optional(),
        time: Joi.date().timestamp(),
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
