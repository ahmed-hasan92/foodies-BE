const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

exports.getRecipes = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const recipe = await Recipe.find();
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};
