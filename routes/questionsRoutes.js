const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const questionSchema = require('../models/joi/questionSchema');

router.get('/list',
    joiSchemaValidation.validate(questionSchema.getAll, 'query'),
    // questionController.getAll,
);



module.exports = router;
