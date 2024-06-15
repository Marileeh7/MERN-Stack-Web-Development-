// ---------------------------------------------------
// ROUTES SETUP - User
// ---------------------------------------------------

// 1) Importing External Libraries
const express = require("express");

// 2) Importing Controller Methods
const {
  register,
  login,
  logout,
  findAllUsers,
  deleteAllUsers,
} = require("../controllers/user.controller");

// 3) Create Router Instance
const UserRouter = express.Router();

// 4) Link Routes with Controller Methods
UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/logout", logout);
UserRouter.get("/", findAllUsers);
UserRouter.delete("/", deleteAllUsers);

// 5) Exporting Router
module.exports = UserRouter;
