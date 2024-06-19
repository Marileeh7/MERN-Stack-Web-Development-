const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pirate need a name"],
        minLength: [2, "Pirates need normal names"]
    },
    photo: {
        type: String,
        required: [true, "Need picture"]
    },
    quote: {
        type: String,
        required: [true, "Need a quote"],
        maxLength: [100, "It's a quote not a poem"]
    },
    position: {
        type: String,
        required: [true, "Need a position"],
    },
    treasure: {
        type: Number,
        min: [0, "Did you lost my treasure?"]
    },
    peg_leg: Boolean,
    eye_patch: Boolean,
    hook_hand: Boolean,
}, {
    timestamps: true
});

const PirateModel = mongoose.model("Pirates", PirateSchema);

module.exports = PirateModel;
