const mongoose = require('mongoose');

module.exports = mongoose.model('User', mongoose.Schema({
        email: String,
        username: String,
    })
);