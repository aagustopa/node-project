const express = require('express');
const router = express.Router();

const questionsController = require('../controllers/questionsController');
// const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
// const usersSchemas = require('../models/joi/usersSchemas');

router.get('/list',
    questionsController.getAll()
);

module.exports = router;
