const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  date: String,
  customer: String,
  shop: String,
  amtShop: Number,
  amtCustomer: Number,
  photo: String, // base64 stored or CDN URL
});

module.exports = mongoose.model("Order", OrderSchema);
