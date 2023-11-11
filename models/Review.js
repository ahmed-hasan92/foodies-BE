const { model, Schema } = require("mongoose");
const reviewSchema = new Schema({
  text: String,
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  recipe: { type: Schema.Types.ObjectId, ref: "Recipe" },
});

module.exports = model("Review", reviewSchema);
