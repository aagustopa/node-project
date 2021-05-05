const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const questionSchema = require('../models/joi/questionSchema');
const questionController = require('../controllers/questionController');

router.post('/create',
    joiSchemaValidation.validate(questionSchema.create, 'body'),
    questionController.create);

router.get('/list',
    joiSchemaValidation.validate(questionSchema.getAll, 'query'),
    questionController.getAll);

router.get('/detail/:id',
    joiSchemaValidation.validate(questionSchema.id, 'query'))

router.put('/update/:id',
    joiSchemaValidation.validate(questionSchema.id, 'params'),
    joiSchemaValidation.validate(questionSchema.update, 'body'),
    questionController.update);

router.delete('/delete/:id',
    joiSchemaValidation.validate(questionSchema.id, 'params'),
    questionController.delete);

module.exports = router;