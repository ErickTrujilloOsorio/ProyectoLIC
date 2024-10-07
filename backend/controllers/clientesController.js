const Cliente = require('../models/cliente'); // Importa correctamente el modelo

// agregar un cliente
exports.agregarCliente = async (req, res) => {
    try {
        console.log(req.body);
        const nuevoCliente = await Cliente.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({
            message: "Error al agregar al cliente: " + error.message,
            stack: error.stack
        });
    }
};

// Función para consultar todos los clientes
exports.consultarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({
            message: "Error al consultar los clientes: " + error.message,
            stack: error.stack
        });
    }
};
