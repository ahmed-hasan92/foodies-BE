const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
////////////////////////////////////////////////////
const nodemailer = require("nodemailer");
////////////////////////////////////////////////////
const { generateRandom } = require("../generateRandom");
const User = require("../models/User");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");
const Category = require("../models/Category");
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
    req.body.isAdmin = false;
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
////////////////////////////To reset The User Password////////////////////////////////////////////
const secretKey = process.env.JWT_SECRET;
exports.forgotPassword = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "1h",
    });
    user.resetToken = resetToken;
    user.resetTokenExpiration = new Date(Date.now() + 3600000);
    await user.save();
    const resetLink = `http://localhost:8000/api/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "foodiesadm23@gmail.com",
        pass: "iknu stje slet prtf",
      },
    });
    transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `Click <a href="${resetLink}">here</a> to reset your password.`,
    });
    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    next(error);
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;

    const user = await User.findOne({
      resetToken,
      resetTokenExpiration: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid or expired reset token" });
    }

    user.password = await hashPassword(password);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
//////////////////////////////////////////////////////////////////////
exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find().populate("recipes");
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.createRecipe = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    if (req.file) {
      req.body.image = req.path;
    }
    const recipe = await Recipe.create(req.body);

    await req.user.updateOne({ $push: { recipes: recipe } });

    res.status(201).json({
      message: `a new recipe ${recipe.title} has been added `,
    });
  } catch (error) {
    next(error);
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////

exports.createRecipeAndJoinWithCategory = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json("The category isn't found");
    }
    if (req.file) {
      req.body.image = req.path;
    }

    const recipe = await Recipe.create(req.body);

    await Ingredient.updateMany(
      { _id: req.body.ingredients },
      { $push: { recipes: recipe._id } }
    );

    category.recipes.push(recipe._id);
    await category.save();

    await req.user.updateOne({ $push: { recipes: recipe } });

    await recipe.save();
    res
      .status(201)
      .json(
        `The recipe: (${recipe.title}) has been added successfully to the categor: (${category.name})`
      );
  } catch (error) {
    next(error);
  }
};
///////////////////////////////////////Workes//////////////////////////////////////////////////////////////
