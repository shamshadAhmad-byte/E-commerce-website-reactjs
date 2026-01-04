const mongoose = require("mongoose");
const { Schema } = mongoose;
const clotheSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: Array, require: true },
  category: { type: String, require: true },
  subCategory: { type: String, require: true },
  size: { type: Array, require: true },
  date: { type: Number, require: true },
  bestSeller: { type: Boolean, require: true },
});
module.exports=mongoose.models.clothe || mongoose.model("clothe", clotheSchema);
