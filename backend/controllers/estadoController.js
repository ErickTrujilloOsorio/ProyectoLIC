const { sequelize } = require('../config/db');
const Estado = require('../models/estado');

exports.obtenerEstados = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        res.json(estados);
    } catch (error) {
        console.error('Error al obtener estados:', error);
        res.status(500).json({ message: "Error al obtener estados", error: error.message });
    }
};