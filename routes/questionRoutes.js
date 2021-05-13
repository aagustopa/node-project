const express = require('express');
const router = express.Router();

const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const questionSchema = require('../models/joi/questionSchema');
const questionController = require('../controllers/questionController');
const tokenValidation = require('../middlewares/tokenValidation');

router.post('/create',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchema.create, 'body'),
    questionController.create);

router.get('/list',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchema.getAll, 'query'),
    questionController.getAll);

router.put('/update/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchema.id, 'params'),
    joiSchemaValidation.validate(questionSchema.update, 'body'),
    questionController.update);

router.delete('/delete/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchema.id, 'params'),
    questionController.delete);

router.get('/getById/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchema.id, 'params'),
    questionController.getById
);

// busqueda avanzada
router.get('/advSearch/',
    tokenValidation.validate,
    joiSchemaValidation.validate(questionSchema.advancedSearch, 'query'),
    questionController.advancedSearch
);

module.exports = router;