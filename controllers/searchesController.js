const questionsService = require('../services/questionsService');

module.exports.getAll = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const amount = req.query.amount || 10;
        const resFromService = await questionsService.getAll(amount);
        console.log(resFromService.data);
        if (resFromService.status === 200) {
            response.msg = 'All Searchs selected successfully';
            response.body = resFromService.result;
        } else if (resFromService.status === 404) {
            response.msg = 'Search not found';
        } else {
            response.msg = resFromService.error;
        }
        response.status = resFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-SearchesController-getAll: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.create = async (req, res) => {
    const responseObj = { status: 500, message: 'Internal server error' };
    try {
        const dataCreate = req.body;
        const resFromService = await questionsService.create(dataCreate);
        if (resFromService.status) {
            responseObj.body = resFromService.result;
            responseObj.message = `Search created successfully`;
            responseObj.status = 201;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-SearchController-create: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
};

module.exports.update = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const dataUpdate = req.body;
        dataUpdate.id = req.params.id;
        const resFromService = await questionsService.update(dataUpdate);
        if (resFromService.status === 200) {
            response.msg = 'Search updated successfully';
            response.body = resFromService.result;
        } else if (resFromService.status === 404) {
            response.msg = 'Search not found';
        } else {
            response.msg = resFromService.error;
        }
        response.status = resFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-SearchesController-update: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.delete = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const SearchId = req.params.id;
        const resFromService = await questionsService.delete(SearchId);
        if (resFromService.status === 200) {
            response.msg = 'Search deleted successfully';
            response.body = resFromService.result;
        } else if (resFromService.status === 404) {
            response.msg = 'Search not found';
        } else {
            response.msg = resFromService.error;
        }
        response.status = resFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-SearchesController-delete: ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.getById = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const SearchId = req.params.id;
        const resFromService = await questionsService.getById(SearchId);
        if (resFromService.status === 200) {
            response.msg = 'Search selected successfully';
            response.body = resFromService.result;
        } else if (resFromService.status === 404) {
            response.msg = 'Search not found';
        } else {
            response.msg = resFromService.error;
        }
        response.status = resFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-SearchesController-getById: ${err}`);
    }
    res.status(response.status).send(response);
}


module.exports.between = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const dates = {
            start: req.query.start,
            end: req.query.end
        };
        const resFromService = await questionsService.between(dates);
        if (resFromService.status === 200) {
            response.msg = 'Search between selected successfully';
            response.body = resFromService.result;
        } else if (resFromService.status === 404) {
            response.msg = 'Search not found';
        } else {
            response.msg = resFromService.error;
        }
        response.status = resFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-SearchesController-between: ${err}`);
    }
    res.status(response.status).send(response);
}