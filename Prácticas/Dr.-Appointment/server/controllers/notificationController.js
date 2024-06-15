const Notification = require("../models/notificationModel"); // Importa el modelo de notificaciones

// Función para obtener todas las notificaciones de un usuario
const getallnotifs = async (req, res) => {
  try {
    // Busca todas las notificaciones del usuario local
    const notifs = await Notification.find({ userId: req.locals });
    return res.send(notifs); // Devuelve las notificaciones encontradas
  } catch (error) {
    res.status(500).send("No se pueden obtener todas las notificaciones"); // Devuelve un error si no se pueden obtener las notificaciones
  }
};

module.exports = {
  getallnotifs, // Exporta la función para obtener todas las notificaciones
};
