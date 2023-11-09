const Category = require("../../models/Category");
const User = require("../../models/User");

exports.getAllCategories = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
exports.createCategory = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    if (!req.user.isAdmin) {
      return next({
        message: `This account doesn't have the permission to create a new category`,
      });
    }

    const category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res
        .status(200)
        .json(
          `A category with the same name (${req.body.name}) had been created before you can't add a new one with same name`
        );
    } else {
      if (req.file) {
        req.body.image = req.path;
      }
      await Category.create(req.body);
      return res.status(201).json({ message: "The category has been created" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const { categoryId } = req.params;
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json(
          "Only users with admin permission are allowed to make this action"
        );
    }
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json("The category isn't found");
    await category.deleteOne();
    res
      .status(200)
      .json(
        `The category with the name: ${category.name} has been delted successfully by the admin`
      );
  } catch (error) {
    next(error);
  }
};
exports.updateCategory = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const { categoryId } = req.params;
    if (!req.user.isAdmin)
      return res
        .status(403)
        .json(
          "Only users with admin permission are allowed to make this action"
        );
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json("This category isn't found");
    if (req.file) {
      req.body.image = req.path;
    }
    await category.updateOne(req.body);
    res.status(200).json("The category has been updated!");
  } catch (error) {
    next(error);
  }
};
