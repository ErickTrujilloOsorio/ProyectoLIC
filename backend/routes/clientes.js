const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente'); // Asegúrate de importar el modelo correctamente

// Rutas
router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const nuevoCliente = await Cliente.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({
            error: 'Error al crear el cliente.',
            message: error.message,
            stack: error.stack
        });
    }
});


module.exports = router;
