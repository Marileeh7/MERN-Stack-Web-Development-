const express = require('express');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

app.listen(port, () =>{
    console.log('Lanzando la app en el puerto ' + port);
});