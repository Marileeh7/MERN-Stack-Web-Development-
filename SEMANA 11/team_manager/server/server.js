const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('./config/mongoose.config');
const configureSocket = require('./config/socket.config');
const playerRoutes = require('./routes/player.routes');
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

app.use(cors());
app.use(express.json());

configureSocket(io);

playerRoutes(app);

const port = 8000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
