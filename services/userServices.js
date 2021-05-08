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
    },
    update: async(dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(dataFromController._id)
                },
                model: User,
                projection: { __v: false },
                updateQuery: {}
            };
            if (dataFromController.username) data.updateQuery.username = dataFromController.username;
            if (dataFromController.password) data.updateQuery.password = dataFromController.password;

            const responseFromDB = await crudRepository.findOneAndUpdate(data);
            if (responseFromDB.status === 200) {
                response.status = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-update ${error}`);
        }
        return response;
    },
    findOne: async(dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: dataFromController,
                model: User,
                projection: { __v: false }
            };
            const responseFromDB = await crudRepository.findOne(data);
            if (response.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-findOne: ${error}`);
        }
        return response;
    }
}