// servidor/config/mongoose.config.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Mascotas", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Conexión a MongoDB exitosa"))
    .catch(err => console.log("Error al conectar a MongoDB", err));
