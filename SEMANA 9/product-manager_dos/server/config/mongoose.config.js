const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/product_manager_dos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(".mongoose.config.js: Established connection to Database"))
    .catch(err => console.log("ERROR:", err));
