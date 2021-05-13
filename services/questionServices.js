const axios = require('axios');
const Question = require('../models/db/questionModel');
const crudRepository = require('../database/crudRepository');
const mongoose = require('mongoose');

module.exports = {
    getAll: async(dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {},
                model: Question,
                projection: {
                    __v: false
                }
            };
            if (dataFromController.slip && dataFromController.limit) {
                data.skip = dataFromController.skip;
                data.limit = dataFromController.limit;
            }
            const responseFromDB = await crudRepository.find(data);
            if (responseFromDB.status) {
                response.status = true;
                response.result = responseFromDB.result;
            }
        } catch (error) {
            console.log(`ERROR-questionService-findAll: ${error}`);
        }
        return response;
    },
    create: async(dataFromController) => {
        const response = { status: false };
        try {
            const question = new Question(dataFromController);
            const responseFromDB = await crudRepository.save(question);
            if (responseFromDB.status) {
                response.status = true;
                response.result = responseFromDB.result;
            } else {
                response.error = responseFromDB.error;
            }
        } catch (error) {
            response.error = error;
            console.log(`ERROR-questionService-create ${error}`);
        }
        return response;
    },
    udpate: async(dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(dataFromController.id)
                },
                model: Question,
                projection: { __v: false },
                updateQuery: {}
            };
            if (dataFromController.category) data.updateQuery.category = dataFromController.category;
            if (dataFromController.type) data.updateQuery.type = dataFromController.type;
            if (dataFromController.difficulty) data.updateQuery.difficulty = dataFromController.difficulty;
            if (dataFromController.question) data.updateQuery.question = dataFromController.question;
            if (dataFromController.correct_answer) data.updateQuery.correct_answer = dataFromController.correct_answer;
            if (dataFromController.incorrect_answers) data.updateQuery.incorrect_answers = dataFromController.incorrect_answers;

            const responseFromDB = await crudRepository.findOneAndUpdate(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
                console.log(response.status);
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-questionService-update ${error}`);
        }
        return response;
    },
    delete: async(userId) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(userId)
                },
                model: Question,
                projection: { __v: false }
            };
            const responseFromDB = await crudRepository.findOneAndDelete(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-questionService-delete ${error}`);
        }
        return response;
    },
    getById: async(userId) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {
                    _id: mongoose.Types.ObjectId(userId)
                },
                model: Question,
                projection: { __v: false }
            };

            const responseFromDB = await crudRepository.findById(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-getById: ${error}`);
        }
        return response;
    },
    findOne: async(dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: dataFromController,
                model: Question,
                projection: { __v: false }
            };
            const responseFromDB = await crudRepository.findOne(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-findOne: ${error}`);
        }
        return response;
    },
    findAll: async(dataFromController) => {
        const response = { status: false };
        try {
            const data = {
                findQuery: {},
                model: Question,
                projection: { __v: false }
            };

            if (dataFromController.category && dataFromController.type && dataFromController.difficulty && dataFromController.question) {
                data.category = dataFromController.category;
                data.type = dataFromController.type;
                data.difficulty = dataFromController.difficulty;
                data.question = dataFromController.question;
            }

            const responseFromDB = await crudRepository.find(data);
            if (responseFromDB.status === 200) {
                response.result = responseFromDB.result;
            }
            response.status = responseFromDB.status;
        } catch (error) {
            response.error = error;
            console.log(`ERROR-userService-findAll: ${error}`);
        }
        return response;
    },
}