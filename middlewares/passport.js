const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { ExtractJwt } = require("passport-jwt");
require("dotenv").config();
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
  },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user)
        return done(null, false, {
          message: "The entered usename or password is wrong",
        });
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword)
        return done(null, false, {
          message: "The entered usename or password is wrong",
        });
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = User.findOne({ _id: payload._id });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
module.exports = { localStrategy, jwtStrategy };
