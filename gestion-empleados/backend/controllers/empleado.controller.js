// Importamos el modelo de Empleado
const Empleado = require('../models/empleado');

// Obtener todos los empleados
const getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find();

        res.json(empleados);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener los empleados',
            error: error.message
        });
    }
};

// Obtener un empleado por su ID
const getEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id);

        if (!empleado) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }

        res.json(empleado);
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener el empleado',
            error: error.message
        });
    }
};

// Crear un nuevo empleado
const createEmpleado = async (req, res) => {
    try {
        const empleado = new Empleado(req.body);

        const empleadoGuardado = await empleado.save();

        res.status(201).json(empleadoGuardado);
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear el empleado',
            error: error.message
        });
    }
};

// Actualizar un empleado
const updateEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!empleado) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }

        res.json(empleado);
    } catch (error) {
        res.status(400).json({
            message: 'Error al actualizar el empleado',
            error: error.message
        });
    }
};

// Eliminar un empleado
const deleteEmpleado = async (req, res) => {
    try {
        const empleado = await Empleado.findByIdAndDelete(req.params.id);

        if (!empleado) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }

        res.json({
            message: 'Empleado eliminado correctamente'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el empleado',
            error: error.message
        });
    }
};

module.exports = {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};