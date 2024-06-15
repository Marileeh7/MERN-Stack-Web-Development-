const mongoose = require("mongoose"); // Importa mongoose para definir el esquema y el modelo

// Define el esquema para los doctores
const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId, // Tipo de dato ObjectId para referenciar al usuario
      ref: "User", // Referencia al modelo "User"
      required: true, // Campo obligatorio
    },
    specialization: {
      type: String, // Tipo de dato String para la especialización del doctor
      required: true, // Campo obligatorio
    },
    experience: {
      type: Number, // Tipo de dato Number para los años de experiencia del doctor
      required: true, // Campo obligatorio
    },
    fees: {
      type: Number, // Tipo de dato Number para las tarifas del doctor
      required: true, // Campo obligatorio
    },
    isDoctor: {
      type: Boolean, // Tipo de dato Boolean para indicar si es doctor
      default: false, // Valor por defecto false
    },
  },
  {
    timestamps: true, // Agrega campos de marcas de tiempo (createdAt y updatedAt)
  }
);

// Crea el modelo de doctores a partir del esquema
const Doctor = mongoose.model("Doctor", schema);

module.exports = Doctor; // Exporta el modelo de doctores
