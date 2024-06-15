const mongoose = require("mongoose"); // Importa mongoose para definir el esquema y el modelo

// Define el esquema para las notificaciones
const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId, // Tipo de dato ObjectId para referenciar al usuario
      ref: "User", // Referencia al modelo "User"
      required: true, // Campo obligatorio
    },
    isRead: {
      type: Boolean, // Tipo de dato Boolean para indicar si la notificación ha sido leída
      default: false, // Valor por defecto false
    },
    content: {
      type: String, // Tipo de dato String para el contenido de la notificación
      default: "", // Valor por defecto una cadena vacía
    },
  },
  {
    timestamps: true, // Agrega campos de marcas de tiempo (createdAt y updatedAt)
  }
);

// Crea el modelo de notificaciones a partir del esquema
const Notification = mongoose.model("Notification", schema);

module.exports = Notification; // Exporta el modelo de notificaciones
