const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require('../helpers/auth/tokenHelpers');
const {validateUserInput} = require("../helpers/input/inputHelpers");
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

  console.log(user);

  res.status(200).json({
    status: true
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
  login
};
