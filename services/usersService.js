const axios = require('axios');
const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');

module.exports = {
    getAll: async function(page) {
        try {
            const resFromServer = await axios(`https://opentdb.com/api.php?amount=${page}`);
            if (resFromServer.status === 200) {
                return {
                    status: resFromServer.status,
                    msg: resFromServer.data
                };
            }
            return {
                status: resFromServer.status,
                msg: 'ERROR'
            };
        } catch (err) {
            return {
                status: false,
                msg: err
            }
        }
    }
}