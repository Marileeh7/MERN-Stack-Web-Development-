const mongoose = require("mongoose");
const db_name = "pirates_db"

// Configuración para asegurar que solo se conecte localmente
mongoose.connect(`mongodb://localhost:27017/${db_name}`).then(() => {
    console.log("Conexión exitosa a MongoDB:" + db_name);
}).catch(() => {
    console.log("Error al conectar a MongoDB");
});
