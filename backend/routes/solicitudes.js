const express = require('express');
const router = express.Router();
const solicitudController = require('../controllers/solicitudesController');
const auth = require('../middleware/jwt')

// Rutas
router.get('/list', auth, solicitudController.list);
router.delete('/:id', auth, solicitudController.delete);

module.exports = router;