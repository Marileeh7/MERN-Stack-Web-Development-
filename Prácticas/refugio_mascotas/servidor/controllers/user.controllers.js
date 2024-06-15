const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports.getUser = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No autorizado' });
  try {
    const decoded = jwt.verify(token, secret);
    User.findById(decoded.id)
      .then(user => {
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json(user);
      })
      .catch(err => res.status(400).json(err));
  } catch (e) {
    res.status(400).json({ msg: 'Token inválido' });
  }
};
