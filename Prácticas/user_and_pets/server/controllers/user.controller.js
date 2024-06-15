const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const UserModel = require("../models/user.model");
const PetModel = require("../models/pet.model");

module.exports = {
  findAllUsers: (req, res) => {
    UserModel.find({})
      .populate("pets")
      .then((allUsers) => res.status(200).json(allUsers))
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },
  findOneUserById: (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "UUID doesn't match the specified format" });
    UserModel.findOne({ _id: req.params.id })
      .populate("pets")
      .then((oneSingleUser) => {
        if (oneSingleUser) {
          res.status(200).json(oneSingleUser);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },
  findOneUserByEmail: (req, res) => {
    UserModel.findOne({ email: req.query.email })
      .populate("pets")
      .then((oneSingleUser) => {
        if (oneSingleUser) {
          res.status(200).json(oneSingleUser);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },
  createNewUser: (req, res) => {
    UserModel.create(req.body)
      .then((newlyCreatedUser) => res.status(201).json(newlyCreatedUser))
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },
  updateOneUserById: (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "UUID doesn't match the specified format" });
    const updateOptions = {
      new: true,
      runValidators: true,
    };

    UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, updateOptions)
      .populate("pets")
      .then((updatedUser) => {
        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },
  deleteAllUsers: (req, res) => {
    UserModel.find({})
      .then((users) => {
        const petIds = users.reduce((ids, user) => [...ids, ...user.pets], []);
        return PetModel.deleteMany({ _id: { $in: petIds } });
      })
      .then(() => UserModel.deleteMany({}))
      .then(() => res.status(200).json({ message: "All users and their pets deleted" }))
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },
  deleteOneUserById: (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).json({ message: "UUID doesn't match the specified format" });

    UserModel.findById({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const petIds = user.pets;
        return PetModel.deleteMany({ _id: { $in: petIds } }).then(() => {
          return UserModel.deleteOne({ _id: req.params.id }).then((result) => {
            if (result.deletedCount === 0) {
              return res.status(404).json({ message: "User not found" });
            } else {
              return res.status(200).json({
                message: "User and associated pets deleted successfully",
              });
            }
          });
        });
      })
      .catch((err) => res.status(500).json({ message: "Something went wrong", errors: err }));
  },
};
