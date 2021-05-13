const axios = require('axios');
const mongoose = require('mongoose');
const crudRepository = require('../database/crudRepository');
const Search = require('../models/db/searchModel');

module.exports = {
    getAll: async function(amount) {
        try {
            const resFromServer = await axios(`https://opentdb.com/api.php?amount=${amount}`);
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
