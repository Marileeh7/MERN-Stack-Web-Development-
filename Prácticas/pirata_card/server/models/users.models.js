const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "You should send a first name"],
        minLength: [2, "The name is not valid"]
    },
    last_name: {
        type: String,
        required: [true, "You should send a last name"],
        minLength: [2, "The name is not valid"]
    },
    email: {
        type: String,
        required: [true, "You should send a email"],
    },
    password: {
        type: String,
        required: [true, "You should send a password"],
        // minLength: [6, "Password should have at least 6 chars"],
        // maxLength: [12, "Password should have max 12 chars"],
    },
}, {
    timestamps: true
});

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;

