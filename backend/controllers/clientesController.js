const Cliente = require('../models/cliente'); // Importa correctamente el modelo

// agregar un cliente
exports.agregarCliente = async (req, res) => {
    try {
        const { nombre, apellido, dui, direccion, correo, telefono, salario, estado} = req.body;

        // Crear nuevo cliente en la base de datos
        const nuevoCliente = await Cliente.create({
            nombre,
            apellido,
            dui,
            direccion,
            correo,
            telefono,
            salario,
            estado
        });
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
