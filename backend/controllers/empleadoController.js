const Empleado = require('../models/empleado');

// Agregar empleado

exports.agregarEmpleado(async (req,res) => {
    try {
        const nuevoEmpleado = await Empleado.create(req.body);
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).json({
            message: "Error al agregar empleado: " + error.message,
            stack: error.stack
        });
    }
});