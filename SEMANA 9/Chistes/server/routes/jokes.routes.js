const express = require('express');
const router = express.Router();
const JokeController = require('../controller/jokes.controller');

// Definir las rutas y asignar los controladores
router.get('/jokes', JokeController.getAllJokes);
router.get('/jokes/:id', JokeController.getJoke);
router.post('/jokes', JokeController.createJoke);
router.put('/jokes/:id', JokeController.updateJoke);
router.delete('/jokes/:id', JokeController.deleteJoke);

module.exports = router;
