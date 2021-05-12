const usersService = require('../services/usersService');

module.exports.getAll = async function(req, res) {
    const response = { status: 500, msg: 'Server Error' };
    try {
        const page = req.query.page || 10;
        const resFromService = await usersService.getAll(page);
        if (resFromService.status) {
            response.status = resFromService.status;
            response.msg = resFromService.msg;
        }
    } catch (err) {
        response.msg = err;
    }
    res.status(response.status).send(response);
}
