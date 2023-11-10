const Ingredient = require("../../models/Ingredient");

exports.getAllIngredients = async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    const ingredients = await Ingredient.find()
      .populate("user")
      .populate("recipes");
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    console.log(req.user._id);
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.updateIngredient = async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findById(ingredientId);

    if (!ingredient) return res.status(404).json("Ingredient not found!!!");

    if (ingredient.user.equals(req.user._id)) {
      await ingredient.updateOne(req.body);
      return res.status(200).json("The ingredient has een UPDATED !!!");
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteIngredient = async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findById(ingredientId);

    if (!ingredient) return res.status(404).json("Ingredient not found!!!");

    if (!ingredient.user.equals(req.user._id)) {
      return res
        .status(403)
        .json("You dont have PERMISSION to delete this item !!!");
    } else {
      await ingredient.deleteOne();
      return res.status(200).json("The ingredient has been DELETED !!!");
    }
  } catch (error) {
    next(error);
  }
};
