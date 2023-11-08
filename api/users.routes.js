const express = require("express");
const passport = require("passport");
const upload = require("../middlewares/multer");
const { signUp, signIn, getAllUsers } = require("./users.controller");
const router = express.Router();
router.post("/user/signup", upload.single("image"), signUp);
router.post(
  "/user/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
router.get("/user", getAllUsers);
module.exports = router;
