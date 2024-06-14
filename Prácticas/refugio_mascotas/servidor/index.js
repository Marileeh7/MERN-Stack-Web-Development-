const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno
require('express-async-errors'); // Asegúrate de tener este módulo instalado

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
  pingInterval: 25000,
  pingTimeout: 20000,
  maxHttpBufferSize: 1e6, // 1 MB
});

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la base de datos
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in .env file");
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch(err => console.log("Error al conectar a MongoDB", err));

// Rutas de la API
const mascotaRoutes = require('./routes/mascota.routes');
const userRoutes = require('./routes/user');

app.use('/api/v1', userRoutes);
app.use('/api/mascotas', mascotaRoutes);

// Configuración de Socket.IO
io.on('connection', socket => {
  console.log('Nuevo cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Emitir eventos desde los controladores
const MascotaController = require('./controllers/mascota.controllers');
if (MascotaController && typeof MascotaController.setSocket === 'function') {
  MascotaController.setSocket(io);
}

const puerto = 8000;
server.listen(puerto, () => {
  console.log(`El servidor está ejecutándose en el puerto ${puerto}`);
});
