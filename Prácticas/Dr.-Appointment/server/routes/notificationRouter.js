const express = require("express"); // Importa express para crear el enrutador
const auth = require("../middleware/auth"); // Importa el middleware de autenticación
const notificationController = require("../controllers/notificationController"); // Importa el controlador de notificaciones

const notificationRouter = express.Router(); // Crea una nueva instancia del enrutador de express

// Define la ruta para obtener todas las notificaciones
notificationRouter.get(
  "/getallnotifs",
  auth, // Middleware de autenticación
  notificationController.getallnotifs // Controlador para obtener todas las notificaciones
);

module.exports = notificationRouter; // Exporta el enrutador de notificaciones
