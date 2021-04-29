const mongoose = require('mongoose');

module.exports = mongoose.model('Question', mongoose.Schema({
        category: String,
        type: String,
        diffulty: String,
        question: String,
        correct_answer: String,
        incorrect_answer: Array,
    })
);
