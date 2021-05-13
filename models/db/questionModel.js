const mongoose = require('mongoose');

module.exports = mongoose.model('Question', mongoose.Schema({
    question: String,
    category: String,
    difficulty: String,
    type: String,
    correct_answer: String,
    incorrect_answers: [{
        type: String
    }],
    busqueda_id: String
}));