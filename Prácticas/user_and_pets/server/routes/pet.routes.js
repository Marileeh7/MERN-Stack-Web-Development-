
const {
  findAllPets,
  findOnePetById,
  createNewPet,
  updateOnePetById,
  deleteAllPets,
  deleteOnePetById,
} = require("../controllers/pet.controller");
express = require("express");


const PetRouter = express.Router();

//  Link Routes with Controller Methods
PetRouter.get("/", findAllPets);
PetRouter.get("/:id/", findOnePetById);
PetRouter.post("/", createNewPet);
PetRouter.put("/:id/", updateOnePetById);
PetRouter.delete("/", deleteAllPets);
PetRouter.delete("/:id/", deleteOnePetById);

module.exports = PetRouter;
