const mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
    username: String,
    password: String
}));