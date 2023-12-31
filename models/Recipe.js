const { model, Schema } = require("mongoose");

const recipeSchema = new Schema({
  title: String,
  description: String,
  shortDescription: { type: String, maxlength: 100 },
  hour: Number,
  minute: Number,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  image: String,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});
module.exports = model("Recipe", recipeSchema);
