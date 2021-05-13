const axios = require('axios');
const mongoose = require('mongoose');
const crudRepository = require('../database/crudRepository');
const Search = require('../models/db/searchModel');
const Question = require('../models/db/questionModel');

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
    },

    questionAPI: async (dataFromController, token) => {
        const responseObj = {
            status: false
        };
        try {
            const responseFromApi = await axios({
                url: `https://opentdb.com/api.php?amount=${dataFromController.amount}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const now = new Date();
            const busqueda = new Search({
                date: now,
                userId: ''
            });
            const responseFromRepository = await crudRepository.save(busqueda);
            const data = await responseFromApi.data.results;
            data.forEach(value => {
                const pregunta = new Question({
                    question: value.question,
                    category: value.category,
                    difficulty: value.difficulty,
                    type: value.type,
                    correct_answer: value.correct_answer,
                    incorrect_answer: value.incorrect_answer,
                    busqueda_id: busqueda._id,
                });
                crudRepository.save(pregunta);
            });
            if (responseFromRepository.status) {
                responseObj.result = responseFromRepository.result;
                responseObj.status = true;
            }
        } catch (error) {
            responseObj.error = error;
            console.log(`ERROR-searchesService-question: ${error}`);
        }
        return responseObj;
    },
}