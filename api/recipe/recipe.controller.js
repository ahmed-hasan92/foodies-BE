const User = require("../../models/User");
const Recipe = require("../../models/Recipe");

exports.createRecipe = async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    if (req.file) {
      req.body.image = req.path;
    }
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};
