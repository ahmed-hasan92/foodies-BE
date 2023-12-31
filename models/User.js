const { model, Schema } = require("mongoose");
const { generateRandom } = require("../generateRandom");
const userSchema = new Schema({
  name: {
    type: String,
    default: generateRandom,
  },
  username: { type: String, required: true, unique: true },
  email: String,
  about: String,
  password: { type: String, required: true },
  image: String,
  isAdmin: { type: Boolean, default: false },
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  ////////////////////////////////
  resetToken: String,
  resetTokenExpiration: Date,
  ////////////////////////////////
});

module.exports = model("User", userSchema);
