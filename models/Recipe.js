const { model, Schema } = require("mongoose");

const recipeSchema = new Schema({
  title: String,
  description: String,
  shortDescription: { type: String, maxlength: 100 },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  Image: String,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = model("Recipe", recipeSchema);
