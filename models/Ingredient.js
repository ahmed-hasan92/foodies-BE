const { model, Schema } = require("mongoose");
const IngredientSchema = new Schema({
  name: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});
module.exports = model("Ingredient", IngredientSchema);
