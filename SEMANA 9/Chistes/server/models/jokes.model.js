const mongoose = require('mongoose');

// Definición del esquema de chiste
const JokeSchema = new mongoose.Schema({
  setup: {
    type: String,
    required: [true, 'La configuración es obligatoria'],
  },
  punchline: {
    type: String,
    required: [true, 'El remate es obligatorio'],
  },
}, { timestamps: true });

// Exportar el modelo
module.exports = mongoose.model('Joke', JokeSchema);
