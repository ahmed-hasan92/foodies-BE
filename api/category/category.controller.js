const Category = require("../../models/Category");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
exports.createCategory = async (req, res, next) => {
  try {
    req.body;
  } catch (error) {
    next(error);
  }
};
