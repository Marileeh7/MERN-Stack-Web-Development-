const express = require("express");
const {
  findAllUsers,
  findOneUserByEmail,
  findOneUserById,
  createNewUser,
  updateOneUserById,
  deleteAllUsers,
  deleteOneUserById,
} = require("../controllers/user.controller");

// Crear una instancia del Router
const UserRouter = express.Router();

UserRouter.get("/", findAllUsers);
UserRouter.get("/by-email/", findOneUserByEmail);
UserRouter.get("/:id/", findOneUserById);
UserRouter.post("/", createNewUser);
UserRouter.put("/:id/", updateOneUserById);
UserRouter.delete("/", deleteAllUsers);
UserRouter.delete("/:id/", deleteOneUserById);

module.exports = UserRouter;
