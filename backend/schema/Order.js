const mongoose = require("mongoose")
const {Schema} = mongoose;

const OrderSchema = new Schema({
  productid: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // product reference
  quantity: { type: Number, required: true },
  productprice: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  orderstatus: { type: String, default: "fulfilled" }, // ✅ bestseller ke liye completed order chahiye
  paymentstatus: { type: String, default: "paid" }, // ✅ bestseller ke liye paid hona chahiye
  userid: { type: Schema.Types.ObjectId, ref: "User", default: null }, // optional (guest order)
  guestInfo: {
    name: { type: String, default: "Guest User" },
    email: { type: String, default: "guest@example.com" },
    phone: { type: String, default: "0000000000" },
    address: { type: String, default: "Default Guest Address" },
  },
  createdAt: { type: Date, default: Date.now },
});

const OrderModel = mongoose.model("Order", OrderSchema)
module.exports = OrderModel;


