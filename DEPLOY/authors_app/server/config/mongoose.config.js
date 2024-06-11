require ('dotenv').config();
const mongoose = require("mongoose");

const URI= process.env.MONGO_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Conexión a la base de datos establecida"))
    .catch(err => console.log("ERROR:", err));
