module.exports.validate = (schema, data) => {
    return (req, res, next) => {
        let objToValidate = {};
        if (data === 'body') objToValidate = req.body;
        else if (data === 'query') objToValidate = req.query;
        else if (data === 'params') objToValidate = req.params;

        const result = schema.validate(objToValidate);

        if (result.error) {
            const errorMessage = result.error.details.map((el) => el.message);
            const responseObj = {
                status: 400,
                body: errorMessage
            }
            return res.status(responseObj.status).send(responseObj);
        } else {
            next();
        }
    }
}