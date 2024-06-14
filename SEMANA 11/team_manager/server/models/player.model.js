const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Player must have a name.'],
    minlength: [2, 'Name must be at least 2 characters long.'],
  },
  position: {
    type: String,
    required: [true, 'Position must be provided.'],
  },
  statusGame1: {
    type: String,
    enum: ['Playing', 'Not Playing', 'Undecided'],
    default: 'Undecided',
  },
  statusGame2: {
    type: String,
    enum: ['Playing', 'Not Playing', 'Undecided'],
    default: 'Undecided',
  },
  statusGame3: {
    type: String,
    enum: ['Playing', 'Not Playing', 'Undecided'],
    default: 'Undecided',
  }
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
