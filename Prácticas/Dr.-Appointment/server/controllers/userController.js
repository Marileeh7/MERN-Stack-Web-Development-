const User = require("../models/userModel"); // Importa el modelo de usuarios
const bcrypt = require("bcrypt"); // Importa bcrypt para el cifrado de contraseñas
const jwt = require("jsonwebtoken"); // Importa jsonwebtoken para la generación de tokens
const Doctor = require("../models/doctorModel"); // Importa el modelo de doctores
const Appointment = require("../models/appointmentModel"); // Importa el modelo de citas

// Función para obtener un usuario por su ID
const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Busca el usuario por ID y excluye la contraseña
    return res.send(user); // Devuelve el usuario encontrado
  } catch (error) {
    res.status(500).send("No se puede obtener el usuario"); // Devuelve un error si no se puede obtener el usuario
  }
};

// Función para obtener todos los usuarios
const getallusers = async (req, res) => {
  try {
    const users = await User.find()
      .find({ _id: { $ne: req.locals } }) // Excluye el usuario local de la búsqueda
      .select("-password"); // Excluye las contraseñas
    return res.send(users); // Devuelve los usuarios encontrados
  } catch (error) {
    res.status(500).send("No se pueden obtener todos los usuarios"); // Devuelve un error si no se pueden obtener los usuarios
  }
};

// Función para el inicio de sesión de un usuario
const login = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email }); // Busca el usuario por correo electrónico
    if (!emailPresent) {
      return res.status(400).send("Credenciales incorrectas"); // Devuelve un error si el correo electrónico no existe
    }
    const verifyPass = await bcrypt.compare(
      req.body.password,
      emailPresent.password
    ); // Compara la contraseña ingresada con la almacenada
    if (!verifyPass) {
      return res.status(400).send("Credenciales incorrectas"); // Devuelve un error si la contraseña es incorrecta
    }
    const token = jwt.sign(
      { userId: emailPresent._id, isAdmin: emailPresent.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "2 días",
      }
    ); // Genera un token JWT
    return res.status(201).send({ msg: "Usuario autenticado exitosamente", token }); // Devuelve un mensaje de éxito y el token
  } catch (error) {
    res.status(500).send("No se puede autenticar el usuario"); // Devuelve un error si no se puede autenticar el usuario
  }
};

// Función para registrar un nuevo usuario
const register = async (req, res) => {
  try {
    const emailPresent = await User.findOne({ email: req.body.email }); // Busca el usuario por correo electrónico
    if (emailPresent) {
      return res.status(400).send("El correo electrónico ya existe"); // Devuelve un error si el correo electrónico ya existe
    }
    const hashedPass = await bcrypt.hash(req.body.password, 10); // Cifra la contraseña
    const user = await User({ ...req.body, password: hashedPass }); // Crea un nuevo usuario con la contraseña cifrada
    const result = await user.save(); // Guarda el usuario en la base de datos
    if (!result) {
      return res.status(500).send("No se puede registrar el usuario"); // Devuelve un error si no se puede registrar el usuario
    }
    return res.status(201).send("Usuario registrado exitosamente"); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).send("No se puede registrar el usuario"); // Devuelve un error si no se puede registrar el usuario
  }
};

// Función para actualizar el perfil de un usuario
const updateprofile = async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10); // Cifra la nueva contraseña
    const result = await User.findByIdAndUpdate(
      { _id: req.locals },
      { ...req.body, password: hashedPass }
    ); // Actualiza el usuario con la nueva información y la contraseña cifrada
    if (!result) {
      return res.status(500).send("No se puede actualizar el usuario"); // Devuelve un error si no se puede actualizar el usuario
    }
    return res.status(201).send("Usuario actualizado exitosamente"); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).send("No se puede actualizar el usuario"); // Devuelve un error si no se puede actualizar el usuario
  }
};

// Función para eliminar un usuario
const deleteuser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.body.userId); // Elimina el usuario por su ID
    const removeDoc = await Doctor.findOneAndDelete({
      userId: req.body.userId,
    }); // Elimina el documento del doctor asociado
    const removeAppoint = await Appointment.findOneAndDelete({
      userId: req.body.userId,
    }); // Elimina las citas del usuario asociado
    return res.send("Usuario eliminado exitosamente"); // Devuelve un mensaje de éxito
  } catch (error) {
    res.status(500).send("No se puede eliminar el usuario"); // Devuelve un error si no se puede eliminar el usuario
  }
};

module.exports = {
  getuser, // Exporta la función para obtener un usuario
  getallusers, // Exporta la función para obtener todos los usuarios
  login, // Exporta la función para el inicio de sesión de un usuario
  register, // Exporta la función para registrar un nuevo usuario
  updateprofile, // Exporta la función para actualizar el perfil de un usuario
  deleteuser, // Exporta la función para eliminar un usuario
};
