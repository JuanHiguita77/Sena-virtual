// Importamos Express
const express = require('express');

// Creamos el router
const router = express.Router();

// Importamos los controladores
const {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
} = require('../controllers/empleado.controller');

// Obtener todos los empleados
router.get('/', getEmpleados);

// Obtener un empleado por ID
router.get('/:id', getEmpleado);

// Crear un empleado
router.post('/', createEmpleado);

// Actualizar un empleado
router.put('/:id', updateEmpleado);

// Eliminar un empleado
router.delete('/:id', deleteEmpleado);

// Exportamos las rutas
module.exports = router;