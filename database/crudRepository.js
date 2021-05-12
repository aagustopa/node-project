module.exports.save = async (obj) => {
    const response = { status: false };
    try {
        const doc = await obj.save();
        response.status = true;
        response.result = doc;
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-save: ${error}`);
    }
    return response;
};

module.exports.findOneAndUpdate = async (data) => {
    const response = { status: 500 };
    try {
        const doc = await data.model.findOneAndUpdate(
            data.findQuery,
            data.updateQuery,
            {new: true, projection: data.projection, useFindAndModify: false});
        if (doc) {
            response.status = 200;
            response.result = doc;
        } else {
            response.status = 404;
        }
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-findOneAndUpdate: ${error}`);
    }
    return response;
};