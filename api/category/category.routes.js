const express = require("express");
const { getAllCategories } = require("./category.controller");
const router = express.Router();

router.get("/categories", getAllCategories);
router.post(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  createCategory
);

module.exports = router;
