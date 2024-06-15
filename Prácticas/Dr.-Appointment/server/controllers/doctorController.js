const Doctor = require("../models/doctorModel"); // Importa el modelo de doctores
const User = require("../models/userModel"); // Importa el modelo de usuarios
const Notification = require("../models/notificationModel"); // Importa el modelo de notificaciones
const Appointment = require("../models/appointmentModel"); // Importa el modelo de citas

// Función para obtener todos los doctores
const getalldoctors = async (req, res) => {
  try {
    let docs;
    if (!req.locals) {
      // Si no hay usuario local, busca todos los doctores
      docs = await Doctor.find({ isDoctor: true }).populate("userId");
    } else {
      // Si hay usuario local, excluye al usuario local de la búsqueda
      docs = await Doctor.find({ isDoctor: true })
        .find({
          _id: { $ne: req.locals },
        })
        .populate("userId");
    }

    return res.send(docs); // Devuelve los doctores encontrados
  } catch (error) {
    res.status(500).send("No se pueden obtener los doctores"); // Devuelve un error si no se pueden obtener los doctores
  }
};

// Función para obtener usuarios que no son doctores
const getnotdoctors = async (req, res) => {
  try {
    // Busca usuarios que no son doctores y excluye al usuario local de la búsqueda
    const docs = await Doctor.find({ isDoctor: false })
      .find({
        _id: { $ne: req.locals },
      })
      .populate("userId");

    return res.send(docs); // Devuelve los usuarios encontrados
  } catch (error) {
    res.status(500).send("No se pueden obtener los usuarios que no son doctores"); // Devuelve un error si no se pueden obtener los usuarios
  }
};

// Función para aplicar para ser doctor
const applyfordoctor = async (req, res) => {
  try {
    // Verifica si ya existe una aplicación para el usuario local
    const alreadyFound = await Doctor.findOne({ userId: req.locals });
    if (alreadyFound) {
      return res.status(400).send("La aplicación ya existe"); // Devuelve un error si la aplicación ya existe
    }

    // Crea una nueva aplicación para ser doctor
    const doctor = Doctor({ ...req.body.formDetails, userId: req.locals });
    const result = await doctor.save();

    return res.status(201).send("Aplicación enviada exitosamente"); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).send("No se puede enviar la aplicación"); // Devuelve un error si no se puede enviar la aplicación
  }
};

// Función para aceptar la aplicación de un doctor
const acceptdoctor = async (req, res) => {
  try {
    // Actualiza el usuario para marcarlo como doctor y aceptado
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: true, status: "accepted" }
    );

    // Actualiza el doctor para marcarlo como doctor
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.id },
      { isDoctor: true }
    );

    // Crea una notificación para el usuario
    const notification = await Notification({
      userId: req.body.id,
      content: `Felicidades, tu aplicación ha sido aceptada.`,
    });

    await notification.save(); // Guarda la notificación

    return res.status(201).send("Notificación de aceptación enviada"); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).send("Error al enviar la notificación"); // Devuelve un error si no se puede enviar la notificación
  }
};

// Función para rechazar la aplicación de un doctor
const rejectdoctor = async (req, res) => {
  try {
    // Actualiza el usuario para marcarlo como no doctor y rechazado
    const details = await User.findOneAndUpdate(
      { _id: req.body.id },
      { isDoctor: false, status: "rejected" }
    );
    // Elimina el documento del doctor
    const delDoc = await Doctor.findOneAndDelete({ userId: req.body.id });

    // Crea una notificación para el usuario
    const notification = await Notification({
      userId: req.body.id,
      content: `Lo siento, tu aplicación ha sido rechazada.`,
    });

    await notification.save(); // Guarda la notificación

    return res.status(201).send("Notificación de rechazo enviada"); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).send("Error al rechazar la aplicación"); // Devuelve un error si no se puede rechazar la aplicación
  }
};

// Función para eliminar un doctor
const deletedoctor = async (req, res) => {
  try {
    // Actualiza el usuario para marcarlo como no doctor
    const result = await User.findByIdAndUpdate(req.body.userId, {
      isDoctor: false,
    });
    // Elimina el documento del doctor
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    });
    // Elimina la cita del doctor
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    });
    return res.send("Doctor eliminado exitosamente"); // Devuelve un mensaje de éxito
  } catch (error) {
    console.log("error", error);
    res.status(500).send("No se puede eliminar el doctor"); // Devuelve un error si no se puede eliminar el doctor
  }
};

module.exports = {
  getalldoctors, // Exporta la función para obtener todos los doctores
  getnotdoctors, // Exporta la función para obtener usuarios que no son doctores
  deletedoctor, // Exporta la función para eliminar un doctor
  applyfordoctor, // Exporta la función para aplicar para ser doctor
  acceptdoctor, // Exporta la función para aceptar la aplicación de un doctor
  rejectdoctor, // Exporta la función para rechazar la aplicación de un doctor
};
