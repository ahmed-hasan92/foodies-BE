const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateRandom } = require("../generateRandom");
const User = require("../models/User");
require("dotenv").config();

const hashPassword = async (password) => {
  const hashedPass = await bcrypt.hash(password, 10);
  return hashedPass;
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
};

exports.signUp = async (req, res, next) => {
  try {
    if (!req.body.name) {
      req.body.name = generateRandom();
    }
    req.body.password = await hashPassword(req.body.password);
    if (req.file) {
      req.body.image = req.path;
    }
    if (req.body.isAdmin) {
      req.body.isAdmin = true;
    }
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
exports.signIn = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
