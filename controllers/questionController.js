const questionServices = require('../services/questionServices');

module.exports.getAll = async(req, res) => {
    const response = { status: 500, msg: 'Internal error serve' };
    try {
        const data = {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        }
        const responseFromService = await questionServices.getAll(data);
        if (responseFromService.status) {
            if (responseFromService.result) {
                response.body = responseFromService.result;
                response.msg = 'Questions list fetched succesfully';
                response.status = 200;
            } else {
                response.msg = 'No questions found';
                response.status = 404;
            }
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-questionController-getAll ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.create = async(req, res) => {
    const response = { status: 500, msg: 'Internal server error!' };
    try {
        const data = req.body;
        const responseFromService = await questionServices.create(data);
        if (responseFromService.status) {
            response.status = 201;
            response.msg = 'Question created succesfully';
            response.body = responseFromService.result;
        } else {
            response.msg = responseFromService.error;
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-questionController-create ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.update = async(req, res) => {
    const response = { status: 500, msg: 'Internal server error!' };
    try {
        const data = req.body;
        data.id = req.params.id;
        const responseFromService = await questionServices.udpate(data);
        if (responseFromService.status === 200) {
            response.msg = 'Question updated sucessfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'User not found'
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-questionController-update ${err}`)
    }
    res.status(response.status).send(response);
}

module.exports.delete = async(req, res) => {
    const response = { status: 500, msg: 'Internal server erorr' };
    try {
        const userId = req.params.id;
        const responseFromService = await questionServices.delete(userId);
        if (responseFromService.status === 200) {
            response.msg = 'Question deleted sucesfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'Question not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.error = err;
        console.log(`ERROR-questionController-update ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.findOne = async(req, res) => {
    const response = { status: 500, msg: 'Internal server error' };
    try {
        const data = {};
        for (let [key, value] of Object.entries(req.query)) {
            data[key] = value;
        }
        const responseFromService = await usersService.findOne(data);
        if (responseFromService.status === 200) {
            response.msg = 'User fetched successfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'User not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-questionController-findOne ${err}`);
    }
    res.status(response.status).send(response);
}