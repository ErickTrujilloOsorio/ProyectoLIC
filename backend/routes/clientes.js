const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas
router.post('/add', clientesController.agregarSolicitud);
router.post('/addCliente', clientesController.agregarCliente);
router.get('/get', clientesController.consultarClientes);
router.put('/:id', clientesController.actualizarCliente);
router.delete('/:id', clientesController.eliminarCliente);

module.exports = router;

