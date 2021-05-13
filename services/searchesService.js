const axios = require('axios');
const mongoose = require('mongoose');
const crudRepository = require('../database/crudRepository');
const Search = require('../models/db/searchModel');

module.exports = {
    create: async (dataFromController) => {
        const response = {
            status: false
        };
        try {
            const user = new Search(dataFromController);
            const responseFromDB = await crudRepository.save(user);
            if (responseFromDB.status) {
                response.status = true;
                response.result = responseFromDB.result;
            } else {
                response.error = responseFromDB.error;
            }
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-create: ${error}`);
        }
        return response;
    },

    update: async (dataFromController) => {
        const response = {
            status: false
        };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(dataFromController.id)
                },
                model: Search,
                projection: {
                    __v: false
                },
                updateQuery: {}
            };
            if (dataFromController.userID) {
                data.updateQuery.userID = dataFromController.userID;
            }
            if (dataFromController.date) {
                data.updateQuery.date = dataFromController.date;
            }

            const responseFromDB = await crudRepository.findOneAndUpdate(data);

            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }

            response.status = responseFromDB.status;

        } catch (error) {
            response.error = error;
            console.log(`ERROR-searchService-update: ${error}`);
        }
        return response;
    },

    delete: async (busquedaId) => {
        const response = {
            status: false
        };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(busquedaId)
                },
                model: Search,
                projection: {
                    __v: false
                },
                DeleteQuery: {}
            };
            const responseFromDB = await crudRepository.findOneAndDelete(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-searchService-delete: ${error}`);
        }
        return response;
    },

    getById: async (busquedaId) => {
        const response = {
            status: false
        };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(busquedaId)
                },
                model: Search,
                projection: {
                    __v: false
                },
                UpdateQuery: {}
            };
            const responseFromDB = await crudRepository.findOne(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-searchService-getByID: ${error}`);
        }
        return response;
    },

    between: async (dates) => {
        const response = {
            status: false
        };
        try {
            const data = {
                dates,
                model: Search,
                projection: {
                    __v: false
                },
            };
            const responseFromDB = await crudRepository.findBetween(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-searchService-datebetween: ${error}`);
        }
        return response;
    }
}