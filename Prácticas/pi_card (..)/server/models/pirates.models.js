const mongoose = require("mongoose");

const PirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pirate needs a name"],
        minLength: [2, "Pirates need normal names"]
    },
    photo: {
        type: String,
        required: [true, "Need picture"]
    },
    quote: {
        type: String,
        required: [true, "Need a quote"],
        maxLength: [100, "It's a quote, not a poem"]
    },
    position: {
        type: String,
        required: [true, "Need a position"],
    },
    treasure: {
        type: Number,
        min: [0, "Did you lose my treasure?"]
    },
    peg_leg: Boolean,
    eye_patch: Boolean,
    hook_hand: Boolean,
}, {
    timestamps: true
});

// Middleware para verificar que solo haya un Capitán
PirateSchema.pre('save', async function(next) {
    if (this.position === 'Captain') {
        const existingCaptain = await PirateModel.findOne({ position: 'Captain' });
        if (existingCaptain && existingCaptain._id.toString() !== this._id.toString()) {
            const error = new Error('A loyal crew can\'t have two captains');
            return next(error);
        }
    }
    next();
});

// Middleware para verificar que solo haya un Capitán en actualizaciones
PirateSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (update.position === 'Captain') {
        const existingCaptain = await PirateModel.findOne({ position: 'Captain' });
        if (existingCaptain && existingCaptain._id.toString() !== this._conditions._id.toString()) {
            const error = new Error('A loyal crew can\'t have two captains');
            return next(error);
        }
    }
    next();
});

const PirateModel = mongoose.model("Pirates", PirateSchema);

module.exports = PirateModel;
