const Joi = require('joi');


module.exports = {
    getAll: Joi.object({
        page: Joi.number().integer().min(1).max(50)
    }),
};