const { model, Schema } = require("mongoose");
const IngredientSchema = new Schema({
  name: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = model("Ingredient", IngredientSchema);
