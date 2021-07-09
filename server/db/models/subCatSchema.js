let mongoose = require("mongoose");
let subCatSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  saleprice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  files: {
    type: Array,
  },
  mainCat: {
    type: String,
    required: true,
  },
  subCat: {
    type: String,
    required: true,
  },
});
let subCatSchma = mongoose.model("subCatProducts", subCatSchema);
module.exports = subCatSchma;
