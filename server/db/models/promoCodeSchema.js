let mongoose = require("mongoose");
let promoCodeSchema = mongoose.Schema({
  promoCode: {
    type: String,
    required: true,
  },
  discountedPercentage: {
    type: Number,
    required: true,
  },
});

let PromCodSchma = mongoose.model("promoCode", promoCodeSchema);
module.exports = PromCodSchma;
