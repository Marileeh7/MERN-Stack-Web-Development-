const { Product } = require("../models/product.model");

// Método para verificar la conexión
module.exports.index = (request, response) => {
    response.json({
        message: "Connected!"
    });
}

// Método para crear un nuevo producto
module.exports.createProduct = (request, response) => {
    const { title, price, description } = request.body;
    Product.create({
        title,
        price,
        description
    })
        .then(product => response.json(product))
        .catch(err => response.status(400).json(err));  // Enviar el error con un código de estado 400
}

// Método para obtener todos los productos
module.exports.allProducts = (request, response) => {
    Product.find({})
        .then(products => response.json(products))
        .catch(err => response.status(400).json(err));  // Enviar el error con un código de estado 400
}

// Método para obtener un producto por su ID
module.exports.oneProduct = (request, response) => {
    Product.findOne({_id: request.params.id})
        .then(product => response.json(product))
        .catch(err => response.status(400).json(err));  // Enviar el error con un código de estado 400
}

// Método para actualizar un producto por su ID
module.exports.updateProduct = (request, response) => {
    Product.findOneAndUpdate({_id: request.params.id}, request.body, { new: true, runValidators: true })
        .then(updated => response.json(updated))
        .catch(err => response.status(400).json(err));  // Enviar el error con un código de estado 400
}

// Método para eliminar un producto por su ID
module.exports.deleteProduct = (request, response) => {
    Product.findOneAndDelete({_id: request.params.id})
        .then(deleted => response.json(deleted))
        .catch(err => response.status(400).json(err));  // Enviar el error con un código de estado 400
}
