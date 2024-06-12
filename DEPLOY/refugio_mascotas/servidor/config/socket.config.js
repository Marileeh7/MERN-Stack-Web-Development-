// servidor/config/socket.config.js
const socket = require("socket.io");

module.exports = (server) => {
    const io = socket(server);

    io.on("connection", (socket) => {
        console.log("Nuevo cliente conectado:", socket.id);

        socket.on("disconnect", () => {
            console.log("Cliente desconectado:", socket.id);
        });
    });

    return io;
};
