// Importamos Mongoose para conectar nuestra aplicación con MongoDB
const mongoose = require('mongoose');

// Dirección de nuestra base de datos MongoDB
const MONGODB_URI = 'mongodb://127.0.0.1:27017/gestion_empleados';

// Función encargada de realizar la conexión
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);

        console.log('MongoDB conectado correctamente');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
    }
};

// Exportamos la función para utilizarla desde index.js
module.exports = connectDB;