const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req, res, next) => {


    const { name, email, password, role} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  res.status(200).json({
    status: true,
    data: user,
  });
});

module.exports = {
  register,
};
