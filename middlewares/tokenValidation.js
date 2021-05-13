const jwt = require("jsonwebtoken");

module.exports.validate = (req, res, next) => {
    const response = {
        status: 400
    };
    const bearerHeader = req.headers.authorization;
    if (bearerHeader && bearerHeader.split(' ')[0] === 'Bearer' && bearerHeader.split(' ')[1]) {
        const token = bearerHeader.split(' ')[1];
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            req.token = decodedToken;
            next();
        } catch (err) {
            response.msg = 'Invalid token';
            res.status(response.status).send(response);
        }
    } else {
        response.msg = 'Missing Bearer token';
        res.status(response.status).send(response);
    }
};