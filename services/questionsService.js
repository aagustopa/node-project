const axios = require('axios');
const Question = require('../models/db/questionModel');
const crudRepository = require('../database/questionsRepository');

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
    },
}
