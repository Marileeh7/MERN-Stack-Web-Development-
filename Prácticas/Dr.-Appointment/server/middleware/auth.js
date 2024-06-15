const jwt = require("jsonwebtoken"); // Importa jsonwebtoken para la verificación de tokens

// Middleware de autenticación
const auth = (req, res, next) => {
  try {
    // Obtiene el token de los encabezados de la solicitud
    const token = req.headers.authorization.split(" ")[1];
    // Verifica el token utilizando la clave secreta
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).send("Error de token"); // Devuelve un error si el token no es válido
    }
    // Asigna el ID de usuario verificado a req.locals
    req.locals = verifyToken.userId;
    next(); // Pasa al siguiente middleware o ruta
  } catch (error) {
    console.log(error);
    return res.status(401).send("Autenticación fallida"); // Devuelve un error si la autenticación falla
  }
};

module.exports = auth; // Exporta el middleware de autenticación
