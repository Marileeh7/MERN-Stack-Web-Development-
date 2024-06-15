// ---------------------------------------------------
// MODEL SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");

// 2) Creating Schema for Model (blueprint)
const PetSchema = new mongoose.Schema({
	name: {
    type: String,
    required: [true, "Pet name is required"],
    minlength: [3, "Pet name must be at least 3 characters long"]
  },
	type: {
    type: String,
    required: [true, "Pet type is required"],
    minlength: [3, "Pet type must be at least 3 characters long"]
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // Remove the object syntax here
    ref: "User",
    required: true
  }
}, {
  timestamps: true
});

// 3) Creating Model using Schema
const UserModel = mongoose.model("Pet", PetSchema);

// 4) Exporting Model
module.exports = UserModel;
