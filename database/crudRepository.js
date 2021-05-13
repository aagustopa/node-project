module.exports.find = async(data) => {
    const response = { status: 500 };
    try {
        const doc = await data.model.find(
            data.findQuery,
            data.projection).skip(data.skip).limit(data.limit);
        if (doc) {
            response.status = 200;
            response.result = doc;
        } else {
            response.status = 404;
        }
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-find: ${error}`);
    }
    return response;
}

module.exports.save = async(obj) => {
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
}

module.exports.findOneAndUpdate = async(data) => {
    const response = { status: 500 };
    try {
        const doc = await data.model.findOneAndUpdate(
            data.findQuery,
            data.updateQuery, { new: true, projection: data.projection, useFindAndModify: false }
        );
        if (doc) {
            response.status = 200;
            response.result = doc;
        } else {
            response.status = 404;
        }
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-findOneAndUpdate ${error}`);
    }
    return response;
}

module.exports.findOneAndDelete = async(data) => {
    const response = { status: 500 };
    try {
        const doc = await data.model.findOneAndDelete(
            data.findQuery, { projection: data.projection });
        if (doc) {
            response.status = 200;
            response.result = doc;
        } else {
            response.status = 404;
        }
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-findOneAndDelete ${error}`);
    }
    return response;
}

module.exports.findById = async(data) => {
    const response = { status: 500 };
    try {
        const doc = await data.model.findById(
            data.findQuery,
            data.projection);
        if (doc) {
            response.status = 200;
            response.result = doc;
        } else {
            response.status = 404;
        }
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-findById: ${error}`);
    }
    return response;
};

module.exports.findOne = async(data) => {
    const response = { status: 500 };
    try {
        const doc = await data.model.findOne(
            data.findQuery,
            data.projection);
        if (doc) {
            response.status = 200;
            response.result = doc;
        } else {
            response.status = 404;
        }
    } catch (error) {
        response.error = error;
        console.log(`ERROR-crudRepository-findOne: ${error}`);
    }
    return response;
}