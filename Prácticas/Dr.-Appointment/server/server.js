const express = require("express"); // Importa express para crear la aplicación
const cors = require("cors"); // Importa cors para habilitar CORS
require("dotenv").config(); // Carga las variables de entorno desde el archivo .env
require("./config/conn"); // Importa el archivo de configuración de la base de datos
const userRouter = require("./routes/userRoutes"); // Importa las rutas de usuario
const doctorRouter = require("./routes/doctorRoutes"); // Importa las rutas de doctor
const appointRouter = require("./routes/appointRoutes"); // Importa las rutas de citas
const notificationRouter = require("./routes/notificationRouter"); // Importa las rutas de notificaciones

const app = express(); // Crea una nueva instancia de la aplicación express
const port = process.env.PORT || 5000; // Configura el puerto de la aplicación

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Habilita la lectura de JSON en las solicitudes

// Define las rutas para los diferentes recursos
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/appointment", appointRouter);
app.use("/api/notification", notificationRouter);

// Comentar o eliminar estas líneas si no quieres servir archivos estáticos desde el directorio 'build'
// app.use(express.static(path.join(__dirname, "./client/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto ${port}`);
});
