const Joke = require('../models/jokes.model');

// Función para formatear JSON de manera legible
const prettyJson = (obj) => JSON.stringify(obj, null, 2);

// Obtener todos los chistes
module.exports.getAllJokes = (req, res) => {
  Joke.find()
    .then(jokes => {
      res.setHeader('Content-Type', 'application/json');
      res.send(prettyJson(jokes));
    })
    .catch(err => res.json({ message: 'Algo salió mal', error: err }));
};

// Obtener un chiste
module.exports.getJoke = (req, res) => {
  Joke.findOne({ _id: req.params.id })
    .then(joke => {
      res.setHeader('Content-Type', 'application/json');
      res.send(prettyJson(joke));
    })
    .catch(err => res.json({ message: 'Algo salió mal', error: err }));
};

// Crear un chiste
module.exports.createJoke = (req, res) => {
  Joke.create(req.body)
    .then(newJoke => {
      res.setHeader('Content-Type', 'application/json');
      res.send(prettyJson(newJoke));
    })
    .catch(err => res.json({ message: 'Algo salió mal', error: err }));
};

// Actualizar un chiste
module.exports.updateJoke = (req, res) => {
  Joke.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then(updatedJoke => {
      res.setHeader('Content-Type', 'application/json');
      res.send(prettyJson(updatedJoke));
    })
    .catch(err => res.json({ message: 'Algo salió mal', error: err }));
};

// Eliminar un chiste
module.exports.deleteJoke = (req, res) => {
  Joke.deleteOne({ _id: req.params.id })
    .then(result => {
      res.setHeader('Content-Type', 'application/json');
      res.send(prettyJson(result));
    })
    .catch(err => res.json({ message: 'Algo salió mal', error: err }));
};
