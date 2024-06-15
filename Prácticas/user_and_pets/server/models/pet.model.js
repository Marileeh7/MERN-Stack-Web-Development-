const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
  },
  type: {
    type: String,
    required: [true, 'Pet type is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Pet owner is required'],
  },
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
