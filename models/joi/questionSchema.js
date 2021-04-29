const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    getAll: Joi.object({

    }),
    create: Joi.object({
        category: Joi.string().alphanum().required(),
        type: Joi.string().alphanum().required(),
        difficulty: Joi.string().alphanum().required(),
        question: Joi.string().alphanum().required(),
        correct_answer: Joi.string().alphanum().required(),
        incorrect_answers: Joi.array()
    }),
    update: Joi.object({
        category: Joi.string().alphanum(),
        type: Joi.string().alphanum(),
        difficulty: Joi.string().alphanum(),
        question: Joi.string().alphanum(),
        correct_answer: Joi.string().alphanum(),
        incorrect_answers: Joi.array()
    }),
    id: Joi.object({
        id: Joi.objectId()
    })
}