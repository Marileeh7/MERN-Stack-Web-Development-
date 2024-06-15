const mongoose = require("mongoose"); // Importa mongoose para definir el esquema y el modelo

// Define el esquema para los usuarios
const schema = mongoose.Schema(
  {
    firstname: {
      type: String, // Tipo de dato String para el nombre
      required: true, // Campo obligatorio
      minLength: 3, // Longitud mínima de 3 caracteres
    },
    lastname: {
      type: String, // Tipo de dato String para el apellido
      required: true, // Campo obligatorio
      minLength: 3, // Longitud mínima de 3 caracteres
    },
    email: {
      type: String, // Tipo de dato String para el correo electrónico
      required: true, // Campo obligatorio
      unique: true, // Debe ser único
    },
    password: {
      type: String, // Tipo de dato String para la contraseña
      required: true, // Campo obligatorio
      minLength: 5, // Longitud mínima de 5 caracteres
    },
    isAdmin: {
      type: Boolean, // Tipo de dato Boolean para indicar si es administrador
      default: false, // Valor por defecto false
    },
    isDoctor: {
      type: Boolean, // Tipo de dato Boolean para indicar si es doctor
      default: false, // Valor por defecto false
    },
    age: {
      type: Number, // Tipo de dato Number para la edad
      default: "", // Valor por defecto cadena vacía
    },
    gender: {
      type: String, // Tipo de dato String para el género
      default: "neither", // Valor por defecto "neither"
    },
    mobile: {
      type: Number, // Tipo de dato Number para el número de móvil
      default: "", // Valor por defecto cadena vacía
    },
    address: {
      type: String, // Tipo de dato String para la dirección
      default: "", // Valor por defecto cadena vacía
    },
    status: {
      type: String, // Tipo de dato String para el estado
      default: "pending", // Valor por defecto "pending"
    },
    pic: {
      type: String, // Tipo de dato String para la URL de la imagen de perfil
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg", // Valor por defecto una URL de imagen de perfil anónima
    },
  },
  {
    timestamps: true, // Agrega campos de marcas de tiempo (createdAt y updatedAt)
  }
);

// Crea el modelo de usuarios a partir del esquema
const User = mongoose.model("User", schema);

module.exports = User; // Exporta el modelo de usuarios
