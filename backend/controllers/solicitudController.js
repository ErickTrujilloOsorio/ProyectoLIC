const Solicitud = require('../models/solicitudes');
const Cliente = require('../models/cliente');
const Empleado = require('../models/empleado');
const Credito = require('../models/credito');
const Estado = require('../models/estado');

exports.obtenerSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Solicitud.findAll({
            include: [
                { model: Cliente, attributes: ['nombre_cliente', 'apellido_cliente'] },
                { model: Empleado, attributes: ['nombre_empleado', 'apellido_empleado'] },
                { model: Credito, attributes: ['nombre_cred'] },
                { model: Estado, attributes: ['estado'] }
            ]
        });
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener solicitudes", error: error.message });
    }
};

exports.actualizarSolicitud = async (req, res) => {
    try {
        const { idSolicitud } = req.params;
        const { cliente_id, empleado_id, credito_id, estado_id } = req.body;

        const solicitudActualizada = await Solicitud.update(
            { cliente_id, empleado_id, credito_id, estado_id },
            { where: { idSolicitud } }
        );

        if (solicitudActualizada[0] === 0) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }

        res.status(200).json({ message: "Solicitud actualizada con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la solicitud", error: error.message });
    }
};