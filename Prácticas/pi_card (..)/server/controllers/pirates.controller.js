const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const PirateModel = require("../models/pirates.models");

module.exports = {
    getAllPirates: (req, res) => {
        PirateModel.find({}, { _id: true, name: true, photo: true })
            .then((pirates) => {
                res.json({ data: pirates });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },

    getOnePirate: (req, res) => {
        let id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "id doesn't match the expected format" });
        }
        PirateModel.findById(id)
            .then((pirate) => {
                if (!pirate) {
                    return res.status(404).json({ message: "Pirate not found" });
                }
                res.json({ data: pirate });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },

    createPirate: async (req, res) => {
        let data = req.body;
        try {
            if (data.position === "Captain" && await PirateModel.exists({ position: "Captain" })) {
                return res.status(400).json({ error: { position: "A loyal crew can't have two captains" } });
            }

            const newPirate = await PirateModel.create(data);
            res.status(201).json({ data: newPirate });
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                let keys = Object.keys(error.errors);
                let error_dict = {};
                keys.forEach((key) => {
                    error_dict[key] = error.errors[key].message;
                });
                res.status(400).json({ error: error_dict });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    },

    deletePirate: (req, res) => {
        let id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "id doesn't match the expected format" });
        }
        PirateModel.findByIdAndDelete(id)
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ message: "Pirate not found" });
                }
                res.json({ success: true });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },

    editPirate: async (req, res) => {
        let id = req.params.id;
        let data = req.body;
        const updateOptions = {
            new: true, // Return the updated document
            runValidators: true, // Enforce validation during update
        };
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "id doesn't match the expected format" });
        }

        try {
            const updatedPirate = await PirateModel.findByIdAndUpdate(id, data, updateOptions);
            if (!updatedPirate) {
                return res.status(404).json({ message: "Pirate not found" });
            }
            res.json({ data: updatedPirate });
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                let keys = Object.keys(error.errors);
                let error_dict = {};
                keys.forEach((key) => {
                    error_dict[key] = error.errors[key].message;
                });
                res.status(400).json({ error: error_dict });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    },
};
