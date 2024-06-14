const PlayerController = require('../controllers/player.controller');

module.exports = (app) => {
  app.get('/players', PlayerController.getAllPlayers);
  app.post('/players', PlayerController.addPlayer);
  app.delete('/players/:id', PlayerController.deletePlayer);
};
