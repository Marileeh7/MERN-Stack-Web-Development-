const express = require("express"); // Importa express para crear el enrutador
const auth = require("../middleware/auth"); // Importa el middleware de autenticación
const userController = require("../controllers/userController"); // Importa el controlador de usuarios

const userRouter = express.Router(); // Crea una nueva instancia del enrutador de express

// Define la ruta para obtener un usuario por su ID
userRouter.get("/getuser/:id", auth, userController.getuser);

// Define la ruta para obtener todos los usuarios
userRouter.get("/getallusers", auth, userController.getallusers);

// Define la ruta para iniciar sesión
userRouter.post("/login", userController.login);

// Define la ruta para registrar un nuevo usuario
userRouter.post("/register", userController.register);

// Define la ruta para actualizar el perfil de un usuario
userRouter.put("/updateprofile", auth, userController.updateprofile);

// Define la ruta para eliminar un usuario
userRouter.delete("/deleteuser", auth, userController.deleteuser);

module.exports = userRouter; // Exporta el enrutador de usuarios
