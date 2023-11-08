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
exports.createCategory = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    const category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res
        .status(200)
        .json(
          `A category with the same name (${req.body.name}) had been created before you can't add a new one with same name`
        );
    } else {
      await Category.create(req.body);
      return res.status(201).json({ message: "The category has been created" });
    }
  } catch (error) {
    next(error);
  }
};
