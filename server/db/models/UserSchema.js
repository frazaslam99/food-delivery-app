let mongoose = require("mongoose");
let userSchema = mongoose.Schema({

    Username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    PhoneNo: {
        type: Number,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        // required: true
    },
});
let UserSchema = mongoose.model("user", userSchema);
module.exports = UserSchema;