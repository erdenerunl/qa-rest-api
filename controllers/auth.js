const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const register = asyncErrorWrapper(async (req, res, next) => {
  const name = "Erdener Ünal";
  const email = "erdener@gmail.com";
  const password = "123456";

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    status: true,
    data: user,
  });
});

module.exports = {
  register,
};
