const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: String,
  recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
});

module.exports = model("Category", CategorySchema);
