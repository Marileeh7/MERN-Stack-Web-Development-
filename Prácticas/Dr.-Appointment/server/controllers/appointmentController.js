const Appointment = require("../models/appointmentModel"); // Importa el modelo de citas
const Notification = require("../models/notificationModel"); // Importa el modelo de notificaciones
const User = require("../models/userModel"); // Importa el modelo de usuarios

// Función para obtener todas las citas
const getallappointments = async (req, res) => {
  try {
    // Verifica si hay una búsqueda en la consulta
    const keyword = req.query.search
      ? {
          $or: [{ userId: req.query.search }, { doctorId: req.query.search }],
        }
      : {};

    // Busca las citas en la base de datos y las popula con la información de doctor y usuario
    const appointments = await Appointment.find(keyword)
      .populate("doctorId")
      .populate("userId");
    return res.send(appointments); // Devuelve las citas encontradas
  } catch (error) {
    res.status(500).send("No se pueden obtener las citas"); // Devuelve un error si no se pueden obtener las citas
  }
};

// Función para reservar una cita
const bookappointment = async (req, res) => {
  try {
    // Crea una nueva cita con los datos del cuerpo de la solicitud
    const appointment = await Appointment({
      date: req.body.date,
      time: req.body.time,
      doctorId: req.body.doctorId,
      userId: req.locals,
    });

    // Crea una notificación para el usuario
    const usernotification = Notification({
      userId: req.locals,
      content: `Reservaste una cita con el Dr. ${req.body.doctorname} para ${req.body.date} ${req.body.time}`,
    });

    await usernotification.save(); // Guarda la notificación del usuario

    const user = await User.findById(req.locals); // Encuentra el usuario por su ID

    // Crea una notificación para el doctor
    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `Tienes una cita con ${user.firstname} ${user.lastname} el ${req.body.date} a las ${req.body.time}`,
    });

    await doctornotification.save(); // Guarda la notificación del doctor

    const result = await appointment.save(); // Guarda la cita en la base de datos
    return res.status(201).send(result); // Devuelve el resultado de la cita guardada
  } catch (error) {
    console.log("error", error);
    res.status(500).send("No se puede reservar la cita"); // Devuelve un error si no se puede reservar la cita
  }
};

// Función para completar una cita
const completed = async (req, res) => {
  try {
    // Actualiza el estado de la cita a "Completado"
    const alreadyFound = await Appointment.findOneAndUpdate(
      { _id: req.body.appointid },
      { status: "Completed" }
    );

    // Crea una notificación para el usuario
    const usernotification = Notification({
      userId: req.locals,
      content: `Tu cita con ${req.body.doctorname} ha sido completada`,
    });

    await usernotification.save(); // Guarda la notificación del usuario

    const user = await User.findById(req.locals); // Encuentra el usuario por su ID

    // Crea una notificación para el doctor
    const doctornotification = Notification({
      userId: req.body.doctorId,
      content: `Tu cita con ${user.firstname} ${user.lastname} ha sido completada`,
    });

    await doctornotification.save(); // Guarda la notificación del doctor

    return res.status(201).send("Cita completada"); // Devuelve un mensaje indicando que la cita ha sido completada
  } catch (error) {
    res.status(500).send("No se puede completar la cita"); // Devuelve un error si no se puede completar la cita
  }
};

module.exports = {
  getallappointments, // Exporta la función para obtener todas las citas
  bookappointment, // Exporta la función para reservar una cita
  completed, // Exporta la función para completar una cita
};
