const { cliente } = require('../models/cliente');

exports.agregarCliente = async (req, res) => {
    try {
        const nuevoCliente = await cliente.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({message: "Error al agregar al cliente: " + error});
    }
}