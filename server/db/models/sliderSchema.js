let mongoose = require("mongoose");
let sliderSchema = mongoose.Schema({
  files: {
    type: Array,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  saleprice: {
    type: String,
    // required:true
  },
});
let SliderSchema = mongoose.model("sliderProduct", sliderSchema);
module.exports = SliderSchema;
