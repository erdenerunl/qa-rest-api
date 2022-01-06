const User = require('../models/User');

const register = async (req, res, next) => {
    const name = "Erdener Ünal";
    const email = "erdener@gmail.com";
    const password = "1234";

    try {
        const user = await User.create({
            name,
            email,
            password
        });
    
        res.status(200).json({
            status: true,
            data: user
        });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    register
}