const Joi = require('joi');

module.exports = {
    getAll: Joi.object({
        amount: Joi.number().integer().min(1).max(50).optional()
    }),
    create: Joi.object({
        // TODO: joi ID
    })
};
