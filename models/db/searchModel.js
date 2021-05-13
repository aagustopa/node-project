const mongoose = require('mongoose');

module.exports = mongoose.model('Search', mongoose.Schema({
    userID: String,
    date: Date,
}));