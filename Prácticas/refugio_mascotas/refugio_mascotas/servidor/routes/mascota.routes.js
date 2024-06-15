const express = require('express');
const router = express.Router();
const MascotaController = require("../controllers/mascota.controllers");

router.get("/mascotas", MascotaController.obtenerTodasMascotas);
router.get("/mascotas/:_id", MascotaController.obtenerUnaMascota);
router.post("/mascotas/nueva", MascotaController.crearMascota);
router.put("/mascotas/actualizar/:_id", MascotaController.actualizarMascota);
router.delete("/mascotas/eliminar/:_id", MascotaController.eliminarMascota);

module.exports = router;
