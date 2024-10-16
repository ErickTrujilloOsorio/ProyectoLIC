const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas
router.post('/add', clientesController.agregarSolicitud);
router.get('/:idCliente', clientesController.obtenerClientePorId);

module.exports = router;

