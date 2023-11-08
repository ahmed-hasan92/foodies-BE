const { model, Schema } = require("mongoose");
const { generateRandom } = require("../generateRandom");
const userSchema = new Schema({
  name: {
    type: String,
    default: generateRandom,
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
});

module.exports = model("User", userSchema);
