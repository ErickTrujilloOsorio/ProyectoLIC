const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/estadoController');

router.get('/get', estadoController.obtenerEstados);

module.exports = router;