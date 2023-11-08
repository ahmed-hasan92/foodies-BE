const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

exports.createRecipe = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};
