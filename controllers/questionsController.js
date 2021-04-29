const questionsService = require('../services/questionsService');

module.exports.getAll = async function (req, res) {
    const response = {status: 500, msg: 'Server Error'};
    try {
        const page = req.query.page || 2;
        const resFromService = await questionsService.getAll(page);
        if (resFromService.status) {
            response.status = resFromService.status;
            response.msg = resFromService.msg;
        }
    } catch (err) {
        response.msg = err;
    }
    res.status(response.status).send(response);
};

module.exports.getAll = async (req, res) => {
    const responseObj = {status: 500, msg: 'Server Error'};
    try {
        const data = {
            skip: parseInt(req.query.skip),
            limit: parseInt(req.query.limit)
        };
        const responseFromService = await questionsService.getAll(data);
        if (responseFromService.status) {
            if (responseFromService.result) {
                responseObj.body = responseFromService.result;
                responseObj.msg = 'Questions fetched successfully';
                responseObj.status = 200;
            } else {
                responseObj.msg = 'No questions found';
                responseObj.status = 404;
            }
        }
    } catch (error) {
        responseObj.error = error
        console.log(`ERROR-userController-findAll: ${error}`)
    }
    return res.status(responseObj.status).send(responseObj);
}
