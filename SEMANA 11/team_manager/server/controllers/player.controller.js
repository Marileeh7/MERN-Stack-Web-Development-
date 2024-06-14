const Player = require('../models/player.model');
let io;

module.exports.setSocket = (socket) => {
  io = socket;
};

module.exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.addPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    io.emit('new_player', player);
    res.json(player);
  } catch (err) {
    const errorMessages = {};
    for (let field in err.errors) {
      errorMessages[field] = err.errors[field].message;
    }
    res.status(400).json({ errors: errorMessages });
  }
};

module.exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    io.emit('delete_player', player._id);
    res.json({ message: 'Player deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.updatePlayerStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const player = await Player.findById(req.params.id);
    if (req.path.includes('game1')) {
      player.statusGame1 = status;
      io.emit('update_player_status_game1', player);
    } else if (req.path.includes('game2')) {
      player.statusGame2 = status;
      io.emit('update_player_status_game2', player);
    } else if (req.path.includes('game3')) {
      player.statusGame3 = status;
      io.emit('update_player_status_game3', player);
    }
    await player.save();
    res.json(player);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
