
const express = require("express");

//  Importing Controller Methods
const {
  register,
  login,
  logout,
  findAllUsers,
  deleteAllUsers,
} = require("../controllers/user.controller");

//  Create Router Instance
const UserRouter = express.Router();

//  Link Routes with Controller Methods
UserRouter.post("/register", register);
UserRouter.post("/login", login);
UserRouter.get("/logout", logout);
UserRouter.get("/", findAllUsers);
UserRouter.delete("/", deleteAllUsers);

//  Exporting Router
module.exports = UserRouter;
