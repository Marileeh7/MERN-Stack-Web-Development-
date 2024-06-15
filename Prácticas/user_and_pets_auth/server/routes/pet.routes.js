// ---------------------------------------------------
// ROUTES SETUP - Pet
// ---------------------------------------------------

// 1) Importing External Libraries
const express = require("express");

// 2) Importing authenticate function for restricting requests
const { authenticate } = require("../config/jwt.config");

// 3) Importing Controller
const {
  findAllPets,
  findOnePetById,
  createNewPet,
  updateOnePetById,
  deleteAllPets,
  deleteOnePetById,
} = require("../controllers/pet.controller");


// 4) Create Router Instance
const PetRouter = express.Router();

// 5) Link Routes with Controller Methods
PetRouter.get("/", authenticate, findAllPets);
PetRouter.get("/:id/", authenticate, findOnePetById);
PetRouter.post("/", authenticate, createNewPet);
PetRouter.put("/:id/", authenticate, updateOnePetById);
PetRouter.delete("/", authenticate, deleteAllPets);
PetRouter.delete("/:id/", authenticate, deleteOnePetById);

// 6) Exporting Router
module.exports = PetRouter;
