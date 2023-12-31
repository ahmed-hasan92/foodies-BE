const express = require("express");

const passport = require("passport");

const {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("./ingredient.controller");
const router = express.Router();

router.get(
  "/ingredients",
  passport.authenticate("jwt", { session: false }),
  getAllIngredients
);
router.post(
  "/ingredients",
  passport.authenticate("jwt", { session: false }),
  createIngredient
);
router.put(
  "/ingredients/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  updateIngredient
);
router.delete(
  "/ingredients/:ingredientId",
  passport.authenticate("jwt", { session: false }),
  deleteIngredient
);

module.exports = router;
