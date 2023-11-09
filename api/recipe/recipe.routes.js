const express = require("express");
const upload = require("../../middlewares/multer");
const passport = require("passport");
const { createRecipe } = require("./recipe.controller");
const router = express.Router();
router.post(
  "/recipe",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipe
);
module.exports = router;
