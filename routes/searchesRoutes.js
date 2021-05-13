const express = require('express');
const router = express.Router();
const joiSchemaValidation = require('../middlewares/joiSchemaValidation');
const searchesSchemas = require('../models/joi/searchesSchema');
const searchesController = require('../controllers/searchesController');

router.get('/list', searchesController.getAll);

// DONE
router.post('/create',
    // tokenValidation.validate,
    joiSchemaValidation.validate(searchesSchemas.create, 'body'), 
    searchesController.create
);

// DONE
router.put('/update/:id', 
    joiSchemaValidation.validate(searchesSchemas.id, 'params'),
    joiSchemaValidation.validate(searchesSchemas.update, 'body'), 
    searchesController.update
);

// DONE
router.delete('/delete/:id', joiSchemaValidation.validate(searchesSchemas.id, 'params'), searchesController.delete);

// DONE
router.get('/get/:id', joiSchemaValidation.validate(searchesSchemas.id, 'params'), searchesController.getById);

router.get('/between', joiSchemaValidation.validate(searchesSchemas.date, 'query'), searchesController.between);

module.exports = router;