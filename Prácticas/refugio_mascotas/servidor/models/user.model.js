const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
    match: [/.+\@.+\..+/, "Por favor ingrese un correo válido"],
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
  },
}, { timestamps: true });

// Encripta la contraseña antes de guardar el usuario
UserSchema.pre('save', function (next) {
  if (!this.isModified('contraseña')) return next();
  bcrypt.hash(this.contraseña, 10, (err, hashedPassword) => {
    if (err) return next(err);
    this.contraseña = hashedPassword;
    next();
  });
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.contraseña, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
