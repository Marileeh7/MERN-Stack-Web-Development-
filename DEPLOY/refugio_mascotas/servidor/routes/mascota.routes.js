// servidor/routes/mascota.routes.js
const MascotaController = require("../controllers/mascota.controllers");

module.exports = app => {
    app.get("/api/mascotas", MascotaController.obtenerTodasMascotas);
    app.get("/api/mascotas/:_id", MascotaController.obtenerUnaMascota);
    app.post("/api/mascotas/nueva", MascotaController.crearMascota);
    app.put("/api/mascotas/actualizar/:_id", MascotaController.actualizarMascota);
    app.delete("/api/mascotas/eliminar/:_id", MascotaController.eliminarMascota);
};
