const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadosController');
const auth = require('../middleware/jwt')

// Rutas
router.post('/login', empleadoController.login);
router.post('/check', auth, empleadoController.check);
router.post('/add', empleadoController.agregarEmpleado);

module.exports = router;