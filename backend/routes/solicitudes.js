const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

// Rutas
router.get('/get', solicitudController.obtenerSolicitudes);
router.post('/asignar', solicitudController.asignarEmpleado);
router.post('/asignarEstado', solicitudController.asignarEstado);

module.exports = router;