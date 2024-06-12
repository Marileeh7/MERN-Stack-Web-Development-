// servidor/controllers/mascota.controllers.js
const Mascota = require('../models/mascota.models');
let io;

module.exports.setSocket = (socket) => {
  io = socket;
};

module.exports.obtenerTodasMascotas = (req, res) => {
  Mascota.find()
    .then(todasMascotas => res.json({ mascotas: todasMascotas }))
    .catch(err => res.status(400).json({ mensaje: 'Error al obtener todas las mascotas', error: err }));
};

module.exports.obtenerUnaMascota = (req, res) => {
  Mascota.findOne({ _id: req.params._id })
    .then(mascota => res.json({ mascota }))
    .catch(err => res.status(400).json({ mensaje: 'Error al obtener esta mascota', error: err }));
};

module.exports.crearMascota = (req, res) => {
  Mascota.create(req.body)
    .then(nuevaMascota => {
      res.json({ mascota: nuevaMascota });
      io.emit('nueva_mascota', nuevaMascota);
    })
    .catch(err => {
      if (err.code === 11000) {
        res.status(400).json({ mensaje: 'El nombre de la mascota ya existe.' });
      } else {
        res.status(400).json({ mensaje: 'Error al crear una mascota', error: err.errors });
      }
    });
};

module.exports.actualizarMascota = (req, res) => {
  const { _id } = req.params;
  const { nombre } = req.body;

  Mascota.findOne({ nombre, _id: { $ne: _id } })
    .then(existingMascota => {
      if (existingMascota) {
        return res.status(400).json({ mensaje: 'El nombre de la mascota ya existe.' });
      }
      return Mascota.updateOne({ _id }, req.body, { runValidators: true });
    })
    .then(() => Mascota.findOne({ _id }))
    .then(mascotaActualizada => {
      res.json({ mascota: mascotaActualizada });
      io.emit('actualizar_mascota', mascotaActualizada);
    })
    .catch(err => {
      if (err.code === 11000) {
        res.status(400).json({ mensaje: 'El nombre de la mascota ya existe.' });
      } else {
        res.status(400).json({ mensaje: 'Error al actualizar esta mascota', error: err.errors });
      }
    });
};

module.exports.eliminarMascota = (req, res) => {
  Mascota.deleteOne({ _id: req.params._id })
    .then(() => {
      res.json({ mensaje: 'Mascota eliminada' });
      io.emit('mascota_eliminada', req.params._id);
    })
    .catch(err => res.status(400).json({ mensaje: 'Error al eliminar esta mascota', error: err }));
};
