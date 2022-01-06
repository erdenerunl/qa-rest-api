const customErrorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(400).json({
        status: false
    })
}

module.exports = customErrorHandler;