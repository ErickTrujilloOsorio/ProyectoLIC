const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

router.get('/get', solicitudController.obtenerSolicitudes);
router.post('/asignar', solicitudController.asignarEmpleado);

module.exports = router;