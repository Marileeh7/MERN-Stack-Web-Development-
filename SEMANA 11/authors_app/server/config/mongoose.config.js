const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/authors_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Conexión a la base de datos establecida"))
    .catch(err => console.log("ERROR:", err));
