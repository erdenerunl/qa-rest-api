const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require('../helpers/auth/tokenHelpers');
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");
const CustomError = require("../helpers/errors/CustomError");

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
  
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const {email, password} = req.body;

  if (!validateUserInput(email, password)) {
    return next( new CustomError("Please check your inputs",));
  }

  const user = await User.findOne({email}).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please check your creds", 401))
  }

  res.status(200).json({
    status: true
  })
})

const logout = asyncErrorWrapper(async (req, res, next) => {
    const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env;
    return res.status(200).cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV !== "development"
    }).json({
      status: true,
      message: "Logout Successful."
    })
})

const getUser = (req, res, next) => {
  res.json({
    status: true,
    data: {
      id: req.user.id,
      name: req.user.name
    }
  })
}

module.exports = {
  register,
  getUser,
  login,
  logout
};
