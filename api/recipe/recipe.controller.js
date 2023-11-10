const User = require("../../models/User");
const Recipe = require("../../models/Recipe");
const Ingredient = require("../../models/Ingredient");

exports.getRecipes = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const recipe = await Recipe.find()
      .populate({
        path: "user",
        select: "username",
      })
      .populate("ingredients");
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

exports.deleteRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json("The recipe isn't found");
    }
    if (!recipe.user || !recipe.user.equals(req.user._id)) {
      return res
        .status(403)
        .json(
          `You must be the creator of this recipe name:( ${recipe.title}) to make this action`
        );
    }
    await recipe.deleteOne();
    res.status(200).json("Successfully deleted");
  } catch (error) {
    next(error);
  }
};

exports.updateRecipe = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json("The recipe isn't found");
    }
    if (!recipe.user || !recipe.user.equals(req.user._id)) {
      return res
        .status(403)
        .json(
          `You must be the creator of this recipe name:( ${recipe.title}) to make this action: update it to: (${req.body.title})`
        );
    }
    if (req.file) {
      req.body.image = req.path;
    }
    await recipe.updateOne(req.body);
    res.status(200).json("Updated Successfully");
  } catch (error) {
    next(error);
  }
};

exports.addIngredientToRecipe = async (req, res, next) => {
  try {
    const { recipeId, ingredientId } = req.params;
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json("The recipe isn't found");
    }
    const ingredient = await Ingredient.findById(ingredientId);
    if (!ingredient) {
      return res.status(404).json("The ingredient isn't found");
    }
    if (!ingredient.user.equals(req.user._id)) {
      return res
        .status(403)
        .json(
          "The creator of this ingredient is the only one allowed to make this action"
        );
    }
    recipe.ingredients.push(ingredientId);
    await recipe.save();
    res
      .status(200)
      .json(
        `The ingredients have been successfully added to the recipe with the name: ${recipe.title}`
      );
  } catch (error) {
    next(error);
  }
};
exports.getOneRecipe = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const { recipeId } = req.params;

    const recipe = await Recipe.findById(recipeId)
      .populate("ingredients")
      .populate("user");

    if (!recipe) {
      return res.status(404).json("The recipe isn't found");
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};
