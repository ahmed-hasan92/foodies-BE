const Category = require("../../models/Category");
const User = require("../../models/User");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
exports.createCategory = async (req, res, next) => {};
