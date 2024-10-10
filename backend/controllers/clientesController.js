const Cliente = require('../models/cliente'); // Importa correctamente el modelo

// agregar un cliente
exports.agregarCliente = async (req, res) => {
    try {
        const { nombre_cliente, apellido_cliente, direccion_cliente, dui, salario, correo_cliente, telefono_cliente, documento1, documento2, documento3, estado_id } = req.body;

        // Verifica que se proporcionen todos los campos necesarios
        if (!nombre_cliente || !apellido_cliente || !direccion_cliente || !dui || !salario || !correo_cliente || !telefono_cliente || !documento1 || !documento2 || !documento3 || !estado_id) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        const cliente = await Cliente.create({
            nombre_cliente,
            apellido_cliente,
            direccion_cliente,
            dui,
            salario,
            correo_cliente,
            telefono_cliente,
            documento1, // Asegúrate de incluir estos campos
            documento2,
            documento3,
            estado_id// O asigna el estado correspondiente
        });

        res.status(201).json(cliente);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar al cliente: " + error.message });
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
