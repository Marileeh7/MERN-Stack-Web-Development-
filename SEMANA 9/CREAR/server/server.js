// server/server.js
const express = require('express');
const cors = require('cors');
const app = express();

require('./config/mongoose.config'); // Conectar a la base de datos

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/person.routes')(app); // Importar rutas

app.listen(8000, () => {
    console.log("Listening at Port 8000")
});
