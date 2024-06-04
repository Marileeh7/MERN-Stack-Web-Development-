const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuración de middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos
require('./configuration/mongoose.config');

// Configurar las rutas
const jokesRoutes = require('./routes/jokes.routes');
app.use('/api', jokesRoutes);

// Iniciar el servidor
app.listen(port, () => console.log(`El servidor está ejecutándose en el puerto ${port}`));
