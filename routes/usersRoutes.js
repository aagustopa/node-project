const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const usersSchema = require('../models/joi/usersSchema');
const tokenValidation = require('../middlewares/tokenValidation');

router.post('/create',
    tokenValidation.validate,
    joiSchemaValidation.validate(usersSchema.create, 'query'),
    usersController.getAll
);

module.exports = router;
