const { model, Schema } = require("mongoose");

const recipeSchema = new Schema({
  title: String,
  decription: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  Image: String,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = model("Recipe", recipeSchema);
