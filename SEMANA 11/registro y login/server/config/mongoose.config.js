const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/login_register');
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('MongoDB no se pudo conectar', err);
  }
};

module.exports = connectDB;


// Este archivo se encarga de la conexión a la base de datos MongoDB.

