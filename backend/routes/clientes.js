const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rutas
router.post('/add', clientesController.agregarCliente);
router.get('/get', clientesController.consultarClientes);

module.exports = router;

