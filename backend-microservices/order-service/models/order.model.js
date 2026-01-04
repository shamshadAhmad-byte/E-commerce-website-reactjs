const mongoose=require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  address: {
    type: Object,
    required: true,
    default: {},
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Placed Order",
  },
  paymentMethod: {
    type: String,
    required: true,
    default: "COD",
  },
  payment: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports=mongoose.models.order || mongoose.model("order", orderSchema);