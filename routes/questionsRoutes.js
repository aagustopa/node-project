const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const usersSchemas = require('../models/joi/usersSchemas');

router.get('/list', 
    joiSchemaValidation.validate(usersSchemas.getAll, 'query'),
    usersController.getAll
);


module.exports = router;