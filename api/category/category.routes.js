const express = require("express");
const upload = require("../../middlewares/multer");
const passport = require("passport");
const {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("./category.controller");

const router = express.Router();

router.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  getAllCategories
);
router.post(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createCategory
);
router.delete(
  "/categories/:categoryId",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);
router.put(
  "/categories/:categoryId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateCategory
);

module.exports = router;
