const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudController');

router.get('/get', solicitudController.obtenerSolicitudes);

module.exports = router;