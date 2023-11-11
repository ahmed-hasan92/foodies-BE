const express = require("express");
const passport = require("passport");
const upload = require("../middlewares/multer");
const {
  signUp,
  signIn,
  getAllUsers,
  createRecipe,
  createRecipeAndJoinWithCategory,
  forgotPassword,
  resetPassword,
} = require("./users.controller");
const router = express.Router();
router.post("/user/signup", upload.single("image"), signUp);
router.post(
  "/user/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
router.get("/user", getAllUsers);
router.post(
  "/user/recipes",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipe
);
router.post(
  "/user/recipe/:categoryId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createRecipeAndJoinWithCategory
);
///////////////////////////////////////////////////////////
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);
//////////////////////////////////////////////////////////
module.exports = router;
