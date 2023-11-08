const express = require("express");
const app = express();
const connectDB = require("./database");
const cors = require("cors");
const morgan = require("morgan");
const usersRoutes = require("./api/users.routes");
const recipeRoutes = require("./api/recipe/recipe.routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const path = require("path");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");
const port = 8000;
app.use(express.json());
app.use(
  cors({
    //This option specifies the origins (domains) that are allowed to access your Express server.
    origin: ["http://localhost:3000"],
  })
);
//
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);
app.use("/media", express.static(path.join(__dirname, "media")));
//
app.use("/api", usersRoutes);
app.use("/api", recipeRoutes);
app.use(errorHandler);
app.use(notFound);
connectDB();
app.listen(port, () => {
  console.log(`The server is running well on port ${port}`);
});
