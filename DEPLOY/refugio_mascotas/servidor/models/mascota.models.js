// servidor/modelos/mascota.modelo.js
const mongoose = require("mongoose");

const MascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "La mascota debe tener un nombre."],
        minlength: [3, "El nombre debe tener al menos 3 caracteres."],
        unique: [true, "El nombre de la mascota debe ser único."]
    },
    tipo: {
        type: String,
        required: [true, "La mascota debe tener un tipo."],
        minlength: [3, "El tipo debe tener al menos 3 caracteres."]
    },
    descripcion: {
        type: String,
        required: [true, "La mascota debe tener una descripción."],
        minlength: [5, "La descripción debe tener al menos 5 caracteres."]
    },
    habilidadUno: String,
    habilidadDos: String,
    habilidadTres: String,
}, { timestamps: true });

const Mascota = mongoose.model("Mascota", MascotaSchema);
module.exports = Mascota;
