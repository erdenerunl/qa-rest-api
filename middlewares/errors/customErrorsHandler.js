const CustomError = require("../../helpers/errors/CustomError");
const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    if (11000 === err.code) {
        // Duplicate Key 
        customError =  new CustomError("Duplicate key found. Check your inputs.", 400)
    }

    res.status(400).json({
        status: false,
        message: customError.message
    })
}

module.exports = customErrorHandler;