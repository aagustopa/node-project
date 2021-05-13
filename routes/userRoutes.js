const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const userSchema = require('../models/joi/userSchema');
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const tokenValidation = require('../middlewares/tokenValidation');

router.post('/create',
    joiSchemaValidation.validate(userSchema.create, 'body'),
    userController.create);

router.post('/logTok',
    joiSchemaValidation.validate(userSchema.generateToken, 'body'),
    authController.login
);

module.exports = router;