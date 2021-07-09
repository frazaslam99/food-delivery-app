let mongoose = require("mongoose");
let createSubCatSchema = mongoose.Schema({
  maincategory: {
    type: String,
    // required: true
  },
  subCateg: {
    type: String,
    // required: true
  },
  file:{
    type:String
  }
});

let createSubCatSchma = mongoose.model(
  "createSubCatProducts",
  createSubCatSchema
);
module.exports = createSubCatSchma;
