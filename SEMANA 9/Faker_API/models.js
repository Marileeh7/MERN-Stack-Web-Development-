// models.js
const faker = require('faker');

class Usuario {
  constructor() {
    this._id = faker.datatype.uuid();
    this.primerNombre = faker.name.firstName();
    this.apellido = faker.name.lastName();
    this.telefono = faker.phone.phoneNumber();
    this.email = faker.internet.email();
    this.contrasena = faker.internet.password();
  }
}

class Empresa {
  constructor() {
    this._id = faker.datatype.uuid();
    this.nombre = faker.company.companyName();
    this.direccion = {
      calle: faker.address.streetAddress(),
      ciudad: faker.address.city(),
      estado: faker.address.state(),
      codigoPostal: faker.address.zipCode(),
      pais: faker.address.country(),
    };
  }
}

module.exports = { Usuario, Empresa };
