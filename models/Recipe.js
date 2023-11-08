const { model, Schema } = require("mongoose");

const recipeSchema = new Schema({
  text: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});
module.exports = model("Recipe", recipeSchema);
