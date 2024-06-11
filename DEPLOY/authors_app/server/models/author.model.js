const mongoose = require('mongoose');

const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;  // Solo letras y espacios
    return regex.test(name);
};

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        validate: {
            validator: validateName,
            message: "El nombre solo puede contener letras y espacios"
        }
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        minlength: [3, "El apellido debe tener al menos 3 caracteres"],
        validate: {
            validator: validateName,
            message: "El apellido solo puede contener letras y espacios"
        }
    },
    quote: {
        type: String,
        required: [true, "La cita es obligatoria"],
        minlength: [3, "La cita debe tener al menos 3 caracteres"],
        validate: {
            validator: function(v) {
                return v.length <= 500;  // Máximo 500 caracteres
            },
            message: "La cita no puede tener más de 500 caracteres"
        }
    }
}, { timestamps: true });

module.exports.Author = mongoose.model("Author", AuthorSchema);
