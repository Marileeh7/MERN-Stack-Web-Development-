
const mongoose = require("mongoose");

//  Creating Schema for Model (blueprint)
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

//  Creating Model using Schema
const UserModel = mongoose.model("Pet", PetSchema);

//  Exporting Model
module.exports = UserModel;
