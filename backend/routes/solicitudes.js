const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');
router.get('/get', solicitudController.obtenerSolicitudes);
router.post('/asignar', solicitudController.asignarEmpleado);



// Nueva ruta para asignar estado
router.post('/asignarEstado', solicitudesController.asignarEstado);
module.exports = router;