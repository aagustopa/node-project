const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const questionSchema = require('../models/joi/questionSchema');
const questionController = require('../controllers/questionController');

router.get('/list',
    joiSchemaValidation.validate(questionSchema.getAll, 'query'),
    questionController.getAll);

router.post('/create',
    joiSchemaValidation.validate(questionSchema.create, 'body'),
    questionController.create);

module.exports = router;