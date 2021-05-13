const userServices = require('../services/userServices');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.create = async(req, res) => {
    const response = { status: 500, msg: 'Internal server error' };
    try {
        // user con pwd encriptada
        // const hashPwd = await bcrypt.hash(req.body.password, salt);
        // const data = { username: req.body.username, password: hashPwd };
        const data = req.body;
        const responseFromService = await userServices.create(data);
        if (responseFromService.status) {
            response.status = 201;
            const token = jwt.sign({ userId: responseFromService.result._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            response.msg = 'User created and authenticated successfully';
            console.log(`Token de usuario generado: ${token}`);
            response.body = {
                user: responseFromService.result,
                token: { token }
            };
        } else {
            response.msg = responseFromService.error;
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-userController-create ${err}`);
    }
    res.status(response.status).send(response);
}