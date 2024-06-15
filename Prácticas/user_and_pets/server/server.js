const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
require("./config/mongoose.config");

// Rutas
const UserRouter = require("./routes/user.routes");
const PetRouter = require("./routes/pet.routes");
app.use('/api/users', UserRouter);
app.use('/api/pets', PetRouter);

// Iniciar el servidor
app.listen(port, () => console.log(`Listening on port: ${port}`));
