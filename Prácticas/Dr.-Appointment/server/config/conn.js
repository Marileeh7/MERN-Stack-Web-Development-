const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Desactiva las consultas estrictas
require("dotenv").config(); // Carga las variables de entorno desde el archivo .env

const mongoUrl = process.env.MONGO_URL; // Obtiene la URL de conexión a MongoDB desde las variables de entorno

if (!mongoUrl) {
  console.error("Error: MONGO_URL no está definido en el archivo .env"); // Muestra un mensaje de error si la URL no está definida
  process.exit(1); // Salir del proceso si la URL no está definida
}

const client = mongoose
  .connect(mongoUrl) // Conecta a la base de datos MongoDB
  .then(() => {
    console.log("DB connected"); // Muestra un mensaje de éxito si la conexión es exitosa
  })
  .catch((error) => {
    console.log("Error: ", error); // Muestra un mensaje de error si hay un problema con la conexión
    return error;
  });

module.exports = client; // Exporta el cliente de la base de datos para usarlo en otros módulos
