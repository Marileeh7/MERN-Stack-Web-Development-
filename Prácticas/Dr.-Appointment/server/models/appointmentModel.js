const mongoose = require("mongoose"); // Importa mongoose para definir el esquema y el modelo

// Define el esquema para las citas
const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId, // Tipo de dato ObjectId para referenciar al usuario
      ref: "User", // Referencia al modelo "User"
      required: true, // Campo obligatorio
    },
    doctorId: {
      type: mongoose.SchemaTypes.ObjectId, // Tipo de dato ObjectId para referenciar al doctor
      ref: "User", // Referencia al modelo "User"
      required: true, // Campo obligatorio
    },
    date: {
      type: String, // Tipo de dato String para la fecha de la cita
      required: true, // Campo obligatorio
    },
    time: {
      type: String, // Tipo de dato String para la hora de la cita
      required: true, // Campo obligatorio
    },
    status: {
      type: String, // Tipo de dato String para el estado de la cita
      default: "Pending", // Valor por defecto "Pending" (pendiente)
    },
  },
  {
    timestamps: true, // Agrega campos de marcas de tiempo (createdAt y updatedAt)
  }
);

// Crea el modelo de citas a partir del esquema
const Appointment = mongoose.model("Appointment", schema);

module.exports = Appointment; // Exporta el modelo de citas
