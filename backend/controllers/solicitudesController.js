const jwt = require('jsonwebtoken');
const solicitud = require('../models/solicitud');

// Listar solicitudes
exports.list = async (req, res) => {
    try {
        const solicitudes = await solicitud.findAll();
        res.json(solicitudes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener las solicitudes' });
    }
};

// Eliminar solicitud
exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const solicitudEliminar = await solicitud.findByPk(id);

        if (!solicitudEliminar) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        await solicitudEliminar.destroy();
        res.json({ message: 'Solicitud eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar la solicitud' });
    }
};