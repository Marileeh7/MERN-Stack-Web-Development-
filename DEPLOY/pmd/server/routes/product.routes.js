const ProductController = require("../controllers/product.controller");

module.exports = (app) => {
    app.get("/api", ProductController.index);
    app.get("/api/products", ProductController.allProducts);
    app.post("/api/products", ProductController.createProduct); // Cambié la ruta a /api/products
    app.get("/api/products/:id", ProductController.oneProduct);
    app.put("/api/products/:id", ProductController.updateProduct); // Cambié UpdateProduct a updateProduct
    app.delete("/api/products/:id", ProductController.deleteProduct);
}
