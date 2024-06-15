const express = require("express"); // Importa express para crear el enrutador
const auth = require("../middleware/auth"); // Importa el middleware de autenticación
const appointmentController = require("../controllers/appointmentController"); // Importa el controlador de citas

const appointRouter = express.Router(); // Crea una nueva instancia del enrutador de express

// Define la ruta para obtener todas las citas
appointRouter.get(
  "/getallappointments",
  auth, // Middleware de autenticación
  appointmentController.getallappointments // Controlador para obtener todas las citas
);

// Define la ruta para reservar una cita
appointRouter.post(
  "/bookappointment",
  auth, // Middleware de autenticación
  appointmentController.bookappointment // Controlador para reservar una cita
);

// Define la ruta para marcar una cita como completada
appointRouter.put("/completed", auth, appointmentController.completed);

module.exports = appointRouter; // Exporta el enrutador de citas
