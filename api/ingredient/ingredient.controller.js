const Ingredient = require("../../models/Ingredient");

exports.getAllIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    next(error);
  }
};

exports.createIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.create(req.body);
    res.status(201).json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.updateIngredient = async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findByIdAndUpdate(
      ingredientId,
      req.body,
      { new: true }
    );
    if (!ingredient) return res.status(404).json("ingredient is not found !!!");
    else res.status(200).json(ingredient);
  } catch (error) {
    next(error);
  }
};

exports.deleteIngredient = async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    const ingredient = await Ingredient.findById(ingredientId);
    if (!ingredient) return res.status(404).json("Ingredient not found !!!");
    await ingredient.deleteOne();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
