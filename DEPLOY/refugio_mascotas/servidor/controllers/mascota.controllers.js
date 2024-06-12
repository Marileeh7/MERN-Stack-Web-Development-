// servidor/controllers/mascota.controllers.js
const Mascota = require("../models/mascota.models");

module.exports.obtenerTodasMascotas = (req, res) => {
    Mascota.find()
        .then(todasMascotas => res.json({ mascotas: todasMascotas }))
        .catch(err => res.json({ mensaje: "Error al obtener todas las mascotas", error: err }));
};

module.exports.obtenerUnaMascota = (req, res) => {
    Mascota.findOne({ _id: req.params._id })
        .then(mascota => res.json({ mascota }))
        .catch(err => res.json({ mensaje: "Error al obtener esta mascota", error: err }));
};

module.exports.crearMascota = (req, res) => {
    Mascota.create(req.body)
        .then(nuevaMascota => res.json({ mascota: nuevaMascota }))
        .catch(err => res.json({ mensaje: "Error al crear una mascota", error: err }));
};

module.exports.actualizarMascota = (req, res) => {
    Mascota.updateOne({ _id: req.params._id }, req.body, { runValidators: true })
        .then(mascotaActualizada => res.json({ mascota: mascotaActualizada }))
        .catch(err => res.json({ mensaje: "Error al actualizar esta mascota", error: err }));
};

module.exports.eliminarMascota = (req, res) => {
    Mascota.deleteOne({ _id: req.params._id })
        .then(() => res.json({ mensaje: "Mascota eliminada" }))
        .catch(err => res.json({ mensaje: "Error al eliminar esta mascota", error: err }));
};
