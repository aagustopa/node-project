const mongoose = require('mongoose');

module.exports = mongoose.model('QuestionDev1', mongoose.Schema({
    category: String,
    type: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: Array
}));