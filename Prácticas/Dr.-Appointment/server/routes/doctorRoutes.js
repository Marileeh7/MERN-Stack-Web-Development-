const express = require("express"); // Importa express para crear el enrutador
const doctorController = require("../controllers/doctorController"); // Importa el controlador de doctores
const auth = require("../middleware/auth"); // Importa el middleware de autenticación

const doctorRouter = express.Router(); // Crea una nueva instancia del enrutador de express

// Define la ruta para obtener todos los doctores
doctorRouter.get("/getalldoctors", doctorController.getalldoctors);

// Define la ruta para obtener usuarios que no son doctores
doctorRouter.get("/getnotdoctors", auth, doctorController.getnotdoctors);

// Define la ruta para aplicar para ser doctor
doctorRouter.post("/applyfordoctor", auth, doctorController.applyfordoctor);

// Define la ruta para eliminar un doctor
doctorRouter.put("/deletedoctor", auth, doctorController.deletedoctor);

// Define la ruta para aceptar la aplicación de un doctor
doctorRouter.put("/acceptdoctor", auth, doctorController.acceptdoctor);

// Define la ruta para rechazar la aplicación de un doctor
doctorRouter.put("/rejectdoctor", auth, doctorController.rejectdoctor);

module.exports = doctorRouter; // Exporta el enrutador de doctores
