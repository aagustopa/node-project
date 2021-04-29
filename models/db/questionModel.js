const mongoose = require('mongoose');

module.exports = mongoose.model('Question', mongoose.Schema({
    category: String,
    type: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: Array
}));