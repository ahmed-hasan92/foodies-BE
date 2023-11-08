const express = require("express");

const {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require("./ingredient.controller");
const router = express.Router();

router.get("/ingredients", getAllIngredients);
router.post("/ingredients", createIngredient);
router.put("/:ingredientId", updateIngredient);
router.delete("/ingredient/:ingredientId", deleteIngredient);

module.exports = router;
