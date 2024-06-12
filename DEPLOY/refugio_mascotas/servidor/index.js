// servidor/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // Cambia esto a la URL de tu cliente si es diferente
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  },
  pingInterval: 25000,
  pingTimeout: 20000,
  maxHttpBufferSize: 1e6 // 1 MB
});

app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto a la URL de tu cliente si es diferente
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de verificación de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Configuración de la base de datos
require('./config/mongoose.config');

// Rutas de la API
require('./routes/mascota.routes')(app);

// Configuración de Socket.IO
io.on('connection', socket => {
  console.log('Nuevo cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Emitir eventos desde los controladores
const MascotaController = require('./controllers/mascota.controllers');
MascotaController.setSocket(io);

const puerto = 8000;
http.listen(puerto, () => {
  console.log(`El servidor está ejecutándose en el puerto ${puerto}`);
});
