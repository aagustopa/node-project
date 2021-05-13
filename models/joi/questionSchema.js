const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    create: Joi.object({
        category: Joi.string().required(),
        type: Joi.string().required(),
        difficulty: Joi.string().required(),
        question: Joi.string().required(),
        correct_answer: Joi.string().required(),
        incorrect_answers: Joi.array().items(Joi.string().required())
    }),
    getAll: Joi.object({
        skip: Joi.number().integer().optional(),
        limit: Joi.number().integer().optional()
    }).and('skip', 'limit'),
    id: Joi.object({
        id: Joi.objectId(),
    }),
    update: Joi.object({
        category: Joi.string(),
        type: Joi.string(),
        difficulty: Joi.string(),
        question: Joi.string(),
        correct_answer: Joi.string(),
        incorrect_answers: Joi.array()
    }),
    findOne: Joi.object({
        _id: Joi.objectId().optional(),
        email: Joi.string().email().optional(),
        username: Joi.string().alphanum().optional()
    }),
    advancedSearch: Joi.object({
        _id: Joi.objectId().optional(),
        category: Joi.string().optional(),
        type: Joi.string().optional(),
        difficulty: Joi.string().optional(),
        question: Joi.string().optional(),
    })
}