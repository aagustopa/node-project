const express = require('express');
const router = express.Router();

const questionsController = require('../controllers/questionsController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const questionSchema = require('../models/joi/questionSchema');

router.get('/list',
    joiSchemaValidation.validate(questionSchema.getAll, 'query'),
    questionsController.getAll
);


module.exports = router;
