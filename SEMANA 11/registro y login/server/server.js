const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoose.config"); 

const controllers = require("./controllers/index"); 
const verifyToken = require("./config/verifyToken"); 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/user", verifyToken, controllers.controllerxid);
app.post("/register", controllers.register);
app.post("/login", controllers.login);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`SERVER FUNCIONANDO EN EL PUERTO ${PORT}`);
  connectDB(); // Llama a la función de conexión a la base de datos
});

module.exports = app;
