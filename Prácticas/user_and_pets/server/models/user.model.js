const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters long"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      maxlength: [20, "Last name must be at most 20 characters long"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 1 year old"],
      max: [150, "Age must be at most 150 years old"],
    },
    interests: {
      type: [String],
      required: [true, "Interests are required"],
      validate: {
        validator: (interestsArray) => interestsArray.length > 0,
        message: "At least one interest must be provided",
      },
    },
    pets: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
