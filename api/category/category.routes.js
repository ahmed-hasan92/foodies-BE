const express = require("express");
const { getAllCategories, createCategory } = require("./category.controller");
const passport = require("passport");
const passport = require(passport);
const router = express.Router();

router.get("/categories", getAllCategories);
router.post(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

module.exports = router;
