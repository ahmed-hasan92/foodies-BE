const express = require("express");
const upload = require("../../middlewares/multer");
const passport = require("passport");
const { getRecipes } = require("./recipe.controller");

const router = express.Router();
router.get(
  "/recipes",
  passport.authenticate("jwt", { session: false }),
  getRecipes
);
module.exports = router;
