// Este archivo exporta todos los controladores desde un solo punto.
const register = require("./register");
const login = require("./login");
const controllerxid = require("./controllerxid");

module.exports = {
  register,
  login,
  controllerxid,
};
