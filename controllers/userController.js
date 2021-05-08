const userServices = require('../services/userServices');
const bcrypt = require('bcrypt');

// username :adminAgus,
// password:pwdAmin
module.exports.create = async(req, res) => {
    const response = { status: 500, msg: 'Internal server error' };
    try {
        // const salt = await bcrypt.genSalt();
        // const hashPwd = await bcrypt.hash(req.body.password, salt);
        const hashPwd = await bcrypt.hash(req.body.password, 10);
        // console.log(salt);
        console.log(hashPwd);
        const data = { username: req.body.username, password: hashPwd };
        const responseFromService = await userServices.create(data);
        if (responseFromService.status) {
            response.status = 201;
            response.msg = 'User created successfully';
            response.body = responseFromService.result; //doc guardat
        } else {
            response.msg = responseFromService.error;
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-userController-create ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.login = async(req, res) => {
    const response = { status: 500, msg: 'Internal sever error' };
    const users = [];
    const user = users.find(user => user.name === req.body.name);
    if (user === null) {
        response.status = 400;
        response.msg = 'User not found';
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            response.msg = 'Succes';
        } else {
            response.msg = 'Not allowed';
        }
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-userController-login ${err}`);
    }
    res.status(response.status).send(response);
}

module.exports.update = async(req, res) => {
    const response = { status: 500, msg: 'Internal server error' };
    try {
        const data = req.body;
        data.id = req.params.id;
        const responseFromService = await userServices.update(data);
        if (responseFromService.status === 200) {
            response.msg = 'User update succesfully';
            response.body = responseFromService.result;
        } else if (responseFromService.status === 404) {
            response.msg = 'User not found';
        } else {
            response.msg = responseFromService.error;
        }
        response.status = responseFromService.status;
    } catch (err) {
        response.msg = err;
        console.log(`ERROR-userController-update ${err}`);
    }
    res.status(response.status).send(response);
}