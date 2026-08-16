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

        // Validamos los datos antes de crear el empleado
        const errorValidacion = validarEmpleado(req.body);

        if (errorValidacion) {
            return res.status(400).json({
                message: errorValidacion
            });
        }

        // Creamos el empleado
        const empleado = new Empleado(req.body);

        // Guardamos el empleado en MongoDB
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

        // Validamos los datos recibidos antes de enviarlos a MongoDB
        const errorValidacion = validarEmpleado(req.body);

        if (errorValidacion) {
            return res.status(400).json({
                message: errorValidacion
            });
        }

        // Buscamos y actualizamos el empleado
        const empleado = await Empleado.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Si no existe el empleado
        if (!empleado) {
            return res.status(404).json({
                message: 'Empleado no encontrado'
            });
        }

        // Devolvemos el empleado actualizado
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


const validarEmpleado = (datos) => {

    const { name, position, office, salary } = datos;

    if (
        typeof name !== 'string' ||
        typeof position !== 'string' ||
        typeof office !== 'string'
    ) {
        return 'Nombre, cargo y oficina deben ser texto';
    }

    if (!name.trim() || !position.trim() || !office.trim()) {
        return 'Nombre, cargo y oficina son obligatorios';
    }

    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!soloLetras.test(name)) {
        return 'El nombre solo puede contener letras y espacios';
    }

    if (!soloLetras.test(position)) {
        return 'El cargo solo puede contener letras y espacios';
    }

    if (!soloLetras.test(office)) {
        return 'La oficina solo puede contener letras y espacios';
    }

    if (typeof salary !== 'number' || salary < 0) {
        return 'El salario debe ser un número positivo';
    }

    return null;
};

module.exports = {
    getEmpleados,
    getEmpleado,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};