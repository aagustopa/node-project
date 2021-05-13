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
};