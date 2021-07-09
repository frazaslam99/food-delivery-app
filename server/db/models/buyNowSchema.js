let mongoose = require("mongoose");
let buyNowSchema = mongoose.Schema({
  cartNewItems: {
    type: Array,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  totalamount: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  msgStatus: {
    type: String,
    required: true,
  },
});
let Orders = mongoose.model("orders", buyNowSchema);
module.exports = Orders;
