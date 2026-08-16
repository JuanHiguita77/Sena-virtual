// Importamos Mongoose
const mongoose = require('mongoose');

// Definimos la estructura de un empleado
const empleadoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    position: {
        type: String,
        required: true
    },

    office: {
        type: String,
        required: true
    },

    salary: {
        type: Number,
        required: true
    }
});

// Creamos y exportamos el modelo Empleado
module.exports = mongoose.model('Empleado', empleadoSchema);