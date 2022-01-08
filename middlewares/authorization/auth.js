const CustomError = require('../../helpers/errors/CustomError');
const {isTokenIncluded} = require("../../helpers/auth/tokenHelpers");
const jwt = require("jsonwebtoken");

const getAccessToRoute = (req, res, next) => {
    
    const {JWT_SECRET_KEY} = process.env;

    if (!isTokenIncluded(req)) {
        return next(new CustomError("You are not authorized", 401));
    }

    const accessToken = req.headers.authorization;
    
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {

        if (err) {
            return next(new CustomError("You are not authorized"));
        }

        req.user = {
            id: decoded.id,
            name: decoded.name
        }
        
    })



    next();
}

module.exports = {getAccessToRoute};