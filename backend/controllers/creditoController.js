const Credito = require('../models/credito');

// Agregar credito

exports.agregarCredito(async (req,res) => {
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