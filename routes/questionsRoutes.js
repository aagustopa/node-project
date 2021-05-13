const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const questionSchema = require('../models/joi/questionSchema');
const questionsController = require('../controllers/searchesController');

router.get('/list',
    joiSchemaValidation.validate(questionSchema.getAll, 'query'),
    questionsController.getAll,
);



module.exports = router;
