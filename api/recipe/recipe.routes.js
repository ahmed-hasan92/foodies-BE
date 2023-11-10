const express = require("express");
const upload = require("../../middlewares/multer");
const passport = require("passport");
const {
  getRecipes,
  deleteRecipe,
  updateRecipe,
  addIngredientToRecipe,
} = require("./recipe.controller");

const router = express.Router();
router.get(
  "/recipes",
  passport.authenticate("jwt", { session: false }),
  getRecipes
);
router.delete(
  "/recipes/:recipeId",
  passport.authenticate("jwt", { session: false }),
  deleteRecipe
);
router.put(
  "/recipes/:recipeId",
  passport.authenticate("jwt", { session: false }),
  updateRecipe
);
router.post(
  "/recipes/:recipeId/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  addIngredientToRecipe
);
module.exports = router;
