const userServices = require('../services/userServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.login = async(req, res) => {
    const response = { status: 500, msg: 'Internal server error' };
    try {
        const user = req.body;
        const responseFromService = await userServices.findOne(user);
        if (responseFromService.status === 200) {
            response.status = responseFromService.status;
            const token = jwt.sign({ userId: responseFromService.result._id },
                process.env.SECRET_KEY, { expiresIn: '1h' }
            );
            response.body = { token };
            response.msg = 'User authenticated';
        } else if (responseFromService.status === 404) {
            response.msg = 'Invalid credentials';
            response.status = 400;
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-authController-login: ${err}`);
    }
    res.status(response.status).send(response);
}