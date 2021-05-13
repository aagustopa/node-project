const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    create: Joi.object({
        question: Joi.string().required(),
        category: Joi.string().required(),
        difficulty: Joi.string().required(),
        type: Joi.string().required(),
        correct_answer: Joi.string().required(),
        incorrect_answers: Joi.array().items(
            Joi.string().required(),
        ).required(),
        busqueda_id: Joi.objectId().optional()
    }),

    getAll: Joi.object({
        amount: Joi.number().integer().min(1).max(50).optional()
    }),
}