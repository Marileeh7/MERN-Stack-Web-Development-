
//  Importing External Libraries
const express = require("express");

//  Importing authenticate function for restricting requests
const { authenticate } = require("../config/jwt.config");

//  Importing Controller
const {
  findAllPets,
  findOnePetById,
  createNewPet,
  updateOnePetById,
  deleteAllPets,
  deleteOnePetById,
} = require("../controllers/pet.controller");


//  Create Router Instance
const PetRouter = express.Router();

//  Link Routes with Controller Methods
PetRouter.get("/", authenticate, findAllPets);
PetRouter.get("/:id/", authenticate, findOnePetById);
PetRouter.post("/", authenticate, createNewPet);
PetRouter.put("/:id/", authenticate, updateOnePetById);
PetRouter.delete("/", authenticate, deleteAllPets);
PetRouter.delete("/:id/", authenticate, deleteOnePetById);

//  Exporting Router
module.exports = PetRouter;
