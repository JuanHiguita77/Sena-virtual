// Importamos Express
const express = require('express');

//CORS
const cors = require('cors');

// Importamos nuestra función de conexión a MongoDB
const connectDB = require('./database');

//Ruta empleados
const empleadosRoutes = require('./routes/empleados.routes');

// Creamos la aplicación Express
const app = express();

app.use(cors());

// Puerto donde funcionará nuestra API
const PORT = 3000;

// Middleware para recibir datos JSON
app.use(express.json());

// Conectamos con MongoDB
connectDB();

app.use('/api/empleados', empleadosRoutes);

// Ruta principal para comprobar que la API funciona
app.get('/', (req, res) => {
    res.json({
        message: 'API de Gestión de Empleados funcionando correctamente'
    });
});

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});