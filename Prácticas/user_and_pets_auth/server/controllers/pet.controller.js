
//  Importing External Libraries
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types; // Destructuring assignment to get ObjectId

//  Importing Model
const PetModel = require("../models/pet.model");

//  Exporting Controller functions
module.exports = {
  //  READ METHODS
  findAllPets: (req, res) => {
    PetModel.find({})
      .populate("owner")
      .then((allPets) => res.status(200).json(allPets))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },
  findOnePetById: (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .json({ message: "UUID doesn't match the specified format" });
    PetModel.findOne({ _id: req.params.id })
      .populate("owner")
      .then((oneSinglePet) => {
        if (oneSinglePet) {
          res.status(200).json(oneSinglePet);
        } else {
          res.status(404).json({ message: "Pet not found" });
        }
      })
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },
  //  CREATE METHODS
  createNewPet: (req, res) => {
    PetModel.create(req.body)
      .then((newPet) => PetModel.findOne({ _id: newPet._id }).populate("owner"))
      .then((newPetPopulated) => res.status(201).json(newPetPopulated))
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(500).json({ message: "Something went wrong", errors: err });
      });
  },
  //  UPDATE METHODS
  updateOnePetById: (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .json({ message: "UUID doesn't match the specified format" });

    const updateOptions = {
      new: true, // Return the updated document
      runValidators: true, // Enforce validation during update
    };

    PetModel.findOneAndUpdate({ _id: req.params.id }, req.body, updateOptions).populate("owner")
      .then((updatedPet) => {
        if (updatedPet) {
          res.status(200).json(updatedPet);
        } else {
          res.status(404).json({ message: "Pet not found" });
        }
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          return res
            .status(400)
            .json({ message: "Validation Errors", errors: err });
        }
        res.status(500).json({ message: "Something went wrong", errors: err });
      });
  },
  // DELETE METHODS
  deleteAllPets: (req, res) => {
    PetModel.deleteMany({})
      .then((result) => res.status(200).json({ message: "All pets deleted", result: result }))
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },
  
  deleteOnePetById: (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res
        .status(400)
        .json({ message: "UUID doesn't match the specified format" });
    PetModel.deleteOne({ _id: req.params.id })
      .then((result) => {
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Pet not found" });
        } else {
          res.status(200).json({ messages: "Pet deleted", result: result });
        }
      })
      .catch((err) =>
        res.status(500).json({ message: "Something went wrong", error: err })
      );
  },
};
