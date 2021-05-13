const searchesService = require('../services/searchesService');

module.exports.question = async (req, res) => {
    const responseObj = {
        status: 500,
        message: 'Internal server error'
    };
    try {
        const data = {
            amount: req.query.amount,
            category: req.query.category,
            difficulty: req.query.difficulty,
            type: req.query.type
        }
        if (req.query.category == undefined) data.category = "";
        if (req.query.difficulty == undefined) data.difficulty = "";
        if (req.query.type == undefined) data.type = "";
        const responseFromService = await searchesService.questionAPI(data, req.token);
        if (responseFromService.status) {
            responseObj.body = responseFromService.result;
            responseObj.message = `Busqueda created successfully`;
            responseObj.status = 201;
        }
    } catch (error) {
        responseObj.error = error;
        console.log(`ERROR-busquedaController-question: ${error}`);
    }
    return res.status(responseObj.status).send(responseObj);
}

module.exports.create = async (req, res) => {
    const responseObj = {
        status: 500,
        message: 'Internal server error'
    };
    try {
        const dataCreate = req.body;
        const resFromService = await searchesService.create(dataCreate);
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

module.exports.update = async function (req, res) {
    const response = {
        status: 500,
        msg: 'Server Error'
    };
    try {
        const dataUpdate = req.body;
        dataUpdate.id = req.params.id;
        const resFromService = await searchesService.update(dataUpdate);
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

module.exports.delete = async function (req, res) {
    const response = {
        status: 500,
        msg: 'Server Error'
    };
    try {
        const SearchId = req.params.id;
        const resFromService = await searchesService.delete(SearchId);
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

module.exports.getById = async function (req, res) {
    const response = {
        status: 500,
        msg: 'Server Error'
    };
    try {
        const SearchId = req.params.id;
        const resFromService = await searchesService.getById(SearchId);
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


module.exports.between = async function (req, res) {
    const response = {
        status: 500,
        msg: 'Server Error'
    };
    try {
        const dates = {
            start: req.query.start,
            end: req.query.end
        };
        const resFromService = await searchesService.between(dates);
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