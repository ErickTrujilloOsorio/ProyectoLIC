const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadosController');
const auth = require('../middleware/jwt')

// Rutas
router.post('/login', empleadoController.login);
router.post('/check', auth, empleadoController.check);
router.post('/add', auth, empleadoController.agregarEmpleado);
router.get('/list', auth, empleadoController.obtenerEmpleados);
router.get('/:id', auth, empleadoController.obtenerEmpleado);
router.put('/:id', auth, empleadoController.actualizarEmpleado);
router.delete('/:id', auth, empleadoController.eliminarEmpleado);

module.exports = router;