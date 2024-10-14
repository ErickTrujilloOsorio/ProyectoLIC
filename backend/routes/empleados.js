const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadosController');
const auth = require('../middleware/jwt')

// Rutas
router.post('/login', empleadoController.login);
router.post('/check', auth, empleadoController.check);
router.post('/add', empleadoController.agregarEmpleado);
router.get('/empleados', empleadoController.getEmpleados); // Ruta para obtener empleados

// Agregar la ruta para eliminar empleado
router.delete('/empleados/:id', empleadoController.eliminarEmpleado); // Para eliminar un empleado por ID

// Agregar la ruta para actualizar empleado
router.put('/empleados/:id', empleadoController.actualizarEmpleado); // Para actualizar un empleado por ID


module.exports = router;