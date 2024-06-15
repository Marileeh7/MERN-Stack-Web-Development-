const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports.register = (req, res) => {
  User.create(req.body)
    .then(user => {
      const payload = { id: user._id };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true })
        .json({ msg: 'Usuario registrado exitosamente', user: user });
    })
    .catch(err => res.status(400).json(err));
};

module.exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
        }
        const payload = { id: user._id };
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true })
          .json({ msg: 'Inicio de sesión exitoso', user: user });
      });
    })
    .catch(err => res.status(400).json(err));
};

module.exports.logout = (req, res) => {
  res.clearCookie('token').json({ msg: 'Cierre de sesión exitoso' });
};

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
