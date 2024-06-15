// ---------------------------------------------------
// MODEL SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

// 2) Creating Schema for Model (blueprint)
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Error: name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Error: email is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Error: password is required"],
    }
  },
  {
    timestamps: true,
  }
);

// 3) Create virtual fields

// 3.1) Create a "virtual space" to hold confirmPassword value
UserSchema.virtual("confirmPassword")
  .get(function() { return this._confirmPassword }) // define getter for virtual property "confirmPassword"
  .set(function(value) { this._confirmPassword = value }); // define setter for virtual property "confirmPassword"

// 3.2) Compare passwords but NOT save confirmPassword to the database
UserSchema.pre("validate", function (next) { // "pre" -> before validating
  if (this.confirmPassword !== this.password) {
    this.invalidate("confirmPassword", "Error: passwords didn't match. Please try again.");
  }
  // if the passwords match, we can successfully continue on to the "normal" validate steps
  next();
})

// 3.3) Hash password before saving to database -> no one can access to the user's real password
UserSchema.pre("save", function (next) {  // "pre" -> before saving to database
  bcrypt.hash(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
})

// 4) Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator,  { message: 'Error: User already registered.' });

// 5) Creating Model using Schema
const UserModel = mongoose.model("User", UserSchema);

// 6) Exporting Model
module.exports = UserModel;
