const User = require('../models/db/userModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');

module.exports = {
    create: async(dataFromController) => {
        const response = { status: false };
        try {
            const user = new User(dataFromController);
            const responseFromDB = await crudRepository.save(user);
            if (responseFromDB.status) {
                response.status = true;
                response.result = responseFromDB.result;
            } else {
                response.error = responseFromDB.error;
            }
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-create ${error}`);
        }
        return response;
    }
}