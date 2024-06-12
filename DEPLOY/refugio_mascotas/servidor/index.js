// servidor/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./config/mongoose.config");
require("./routes/mascota.routes")(app);

io.on("connection", socket => {
    console.log("Nuevo cliente conectado:", socket.id);

    socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
    });
});

const puerto = 8000;
http.listen(puerto, () => {
    console.log(`El servidor está ejecutándose en el puerto ${puerto}`);
});
