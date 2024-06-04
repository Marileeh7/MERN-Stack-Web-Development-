const mongoose = require('mongoose');

mongoose.set('debug', true); // Para salida legible

mongoose.connect('mongodb://localhost:27017/chistes_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado a la base de datos de chistes'))
  .catch(err => console.error('Error al conectarse a la base de datos de chistes', err));
