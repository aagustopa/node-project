const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const userServices = require('../services/userServices');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const userSchema = require('../models/joi/userSchema');

router.post('/create',
    joiSchemaValidation.validate(userSchema.create, 'body'),
    userController.create);

module.exports = router;