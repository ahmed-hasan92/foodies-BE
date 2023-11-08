const express = require("express");
const passport = require("passport");
const { createRecipe } = require("./recipe.controller");
const router = express.Router();
router.post(
  "/recipe",
  passport.authenticate("jwt", { session: false }),
  createRecipe
);
module.exports = router;
