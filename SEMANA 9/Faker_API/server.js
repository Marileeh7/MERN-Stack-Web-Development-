// server.js
const express = require('express');
const faker = require('faker');
const { Usuario, Empresa } = require('./models');

const app = express();
const PORT = 8000;

// Función para formatear JSON de manera legible
const prettyJson = (obj) => JSON.stringify(obj, null, 2);

// Ruta para generar un nuevo usuario
app.get('/api/users/new', (req, res) => {
  const nuevoUsuario = new Usuario();
  res.setHeader('Content-Type', 'application/json');
  res.send(prettyJson(nuevoUsuario));
});

app.get('/api/companies/new', (req, res) => {
  const nuevaEmpresa = new Empresa();
  res.setHeader('Content-Type', 'application/json');
  res.send(prettyJson(nuevaEmpresa));
});

app.get('/api/user/company', (req, res) => {
  const nuevoUsuario = new Usuario();
  const nuevaEmpresa = new Empresa();
  res.setHeader('Content-Type', 'application/json');
  res.send(prettyJson({ usuario: nuevoUsuario, empresa: nuevaEmpresa }));
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
