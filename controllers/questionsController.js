const questionsService = require('../services/questionsService');

module.exports.getAll = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const amount = req.query.amount || 10;
        const resFromService = await questionsService.getAll(amount);
        if (resFromService.status) {
            response.status = resFromService.status;
            response.msg = resFromService.msg;
        }
    } catch (err) {
        response.msg = err;
    }
    res.status(response.status).send(response);
}
