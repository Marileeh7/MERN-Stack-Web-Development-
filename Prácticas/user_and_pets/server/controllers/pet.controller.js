const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const PetModel = require('../models/pet.model');
const UserModel = require('../models/user.model');

module.exports = {
  createNewPet: (req, res) => {
    // Validar si el owner es un ObjectId válido
    if (!ObjectId.isValid(req.body.owner)) {
      return res.status(400).json({ message: "UUID Owner doesn't match the specified format" });
    }

    // Buscar el usuario por ID
    UserModel.findOne({ _id: req.body.owner })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: 'Owner not found' });
        }

        // Crear la mascota
        PetModel.create(req.body)
          .then((pet) => {
            // Actualizar la lista de mascotas del usuario
            UserModel.findOneAndUpdate(
              { _id: req.body.owner },
              { $push: { pets: pet._id } },
              { new: true }
            )
            .then(() => res.status(200).send(pet))
            .catch((err) => {
              if (err.name === 'ValidationError') {
                return res.status(400).json({ message: 'Validation Errors', errors: err });
              }
              res.status(500).json({ message: 'Something went wrong', errors: err });
            });
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              return res.status(400).json({ message: 'Validation Errors', errors: err });
            }
            res.status(500).json({ message: 'Something went wrong', errors: err });
          });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Something went wrong', errors: err });
      });
  },

  findAllPets: (req, res) => {
    PetModel.find({})
      .populate("owner")
      .then((allPets) => res.status(200).json(allPets))
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },

  findOnePetById: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "UUID doesn't match the specified format" });
    PetModel.findOne({ _id: req.params.id })
      .populate('owner')
      .then((oneSinglePet) => {
        if (oneSinglePet) res.status(200).json(oneSinglePet);
        else res.status(404).json({ message: 'Pet not found' });
      })
      .catch((err) => res.status(500).json({ message: 'Something went wrong', errors: err }));
  },

  updateOnePetById: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "UUID doesn't match the specified format" });

    const updateOptions = {
      new: true,
      runValidators: true,
    };

    PetModel.findById(req.params.id)
      .then((existingPet) => {
        if (!existingPet) return res.status(404).json({ message: 'Pet not found' });

        const oldOwnerId = existingPet.owner;
        const newOwnerId = req.body.owner;

        if (!ObjectId.isValid(newOwnerId)) return res.status(400).json({ message: 'Invalid UUID for the new owner' });

        if (oldOwnerId.toString() !== newOwnerId) {
          return Promise.all([
            UserModel.findOneAndUpdate(
              { _id: oldOwnerId },
              { $pull: { pets: existingPet._id } }
            ),
            UserModel.findOneAndUpdate(
              { _id: newOwnerId },
              { $push: { pets: existingPet._id } }
            ),
          ])
            .then(() => {
              return PetModel.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                updateOptions
              )
                .populate('owner')
                .then((updatedPet) => res.status(200).json(updatedPet));
            })
            .catch((err) => {
              if (err.name === 'ValidationError') return res.status(400).json({ message: 'Validation Errors', errors: err });
              res.status(500).json({ message: 'Something went wrong', errors: err });
            });
        } else {
          PetModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            updateOptions
          )
            .populate('owner')
            .then((updatedPet) => res.status(200).json(updatedPet));
        }
      })
      .catch((err) => {
        if (err.name === 'ValidationError') return res.status(400).json({ message: 'Validation Errors', errors: err });
        res.status(500).json({ message: 'Something went wrong', errors: err });
      });
  },

  deleteOnePetById: (req, res) => {
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({ message: "UUID doesn't match the specified format" });

    PetModel.findOne({ _id: req.params.id })
      .then((pet) => {
        if (!pet) return res.status(404).send({ message: 'Pet not found' });
        const ownerId = pet.owner;
        return PetModel.deleteOne({ _id: req.params.id }).then(() => {
          return UserModel.findByIdAndUpdate(
            ownerId,
            { $pull: { pets: req.params.id } },
            { new: true }
          ).then(() => res.status(200).send({ message: 'Pet deleted successfully' }));
        });
      })
      .catch((err) => res.status(500).json({ message: 'Something went wrong', errors: err }));
  },

  deleteAllPets: (req, res) => {
    PetModel.deleteMany({})
      .then(() => UserModel.updateMany({}, { $set: { pets: [] } }))
      .then(() => res.status(200).json({ message: 'All pets deleted' }))
      .catch((err) => res.status(500).json({ message: 'Something went wrong', errors: err }));
  },
};
