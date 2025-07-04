const { validationResult } = require("express-validator");
const userModel = require('../models/User');
const userService = require('../services/userService');
const blackListTokenModel = require('../models/blacklistToken');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fullname, email, password } = req.body;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await userModel.hashedPassword(password);

  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: 'Invalid Email or Password' });
  }

  const token = user.generateAuthToken();
  res.cookie('token', token);
  res.status(200).json({ token, user });
};

const logoutUser = async (req, res) => {
  const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
  if (token) await blackListTokenModel.create({ token });
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, logoutUser };
