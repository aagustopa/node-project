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

// comparar hash pwd
router.post('/login',
    joiSchemaValidation.validate(userSchema.login, 'body'),
    userController.login);

// CON ESTO GENERAMOS EL TOKEN PERO DEBEMOS GENERARLO CON UN USUARIO QUE YA EXISTE
router.post('/logTok',
    joiSchemaValidation.validate(userSchema.login, 'body'),
    authController.login
);

// CON ESTO COMPROBAMOS EL TOKEN?
router.put('/update/:id',
    tokenValidation.validate,
    joiSchemaValidation.validate(userSchema.id, 'params'),
    joiSchemaValidation.validate(userSchema.update, 'body'),
    userController.update
);

module.exports = router;

// usuario3
// contra3
// $2b$10$5jgMFVLo9JKOUBWYlyfT4uWHbq7NROIUI2GPVmD0MP1q25cSqe5ia