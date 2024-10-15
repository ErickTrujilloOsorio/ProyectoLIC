const { sequelize } = require('../config/db');
const Solicitud = require('../models/solicitud');
<<<<<<< HEAD
const Estado = require('../models/estado');
=======
const Estado = require('../models/estado'); 
>>>>>>> main
exports.obtenerSolicitudes = async (req, res) => {
    try {
        const [solicitudes] = await sequelize.query(
            `SELECT DISTINCT s.idSolicitud, c.nombre_cliente, c.idCliente, c.apellido_cliente, 
                    e.nombre_empleado, e.apellido_empleado, 
<<<<<<< HEAD
                    est.nombre_estado, est.descripcion_estado AS estado_descripcion, 
=======
                    est.estado, est.descripcion_estado AS estado_descripcion, 
>>>>>>> main
                    cr.nombre_credito, cr.interes
             FROM solicitudes s
             INNER JOIN clientes c ON s.cliente_id = c.idCliente
             INNER JOIN empleados e ON s.empleado_id = e.idEmpleado
             INNER JOIN estados est ON s.estado_id = est.idEstado
             INNER JOIN creditos cr ON s.credito_id = cr.idCredito`
        );

        console.log(solicitudes);
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
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


// Asignacion

exports.asignarEmpleado = async (req, res) => {
    const { idSolicitud, empleado_id } = req.body; 
    try {
        const solicitud = await Solicitud.findByPk(idSolicitud);
        console.log(solicitud)
        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        // Actualizar el empleado asignado
        solicitud.empleado_id = empleado_id;
        await solicitud.save();

        res.status(200).json({ message: 'Empleado asignado correctamente', solicitud });
    } catch (error) {
        console.error('Error al asignar empleado:', error);
        res.status(500).json({ message: "Error al asignar empleado", error: error.message });
    }
};

<<<<<<< HEAD
// Asignaremos un estado a una solicitud
=======
// Asignar un estado a una solicitud, esperemos funcione pa!
>>>>>>> main
exports.asignarEstado = async (req, res) => {
    const { idSolicitud, estado_id } = req.body; 
    try {
        const solicitud = await Solicitud.findByPk(idSolicitud);
<<<<<<< HEAD
        const estado = await Estado.findByPk(estado_id);
=======
        const estado = await Estado.findByPk(estado_id);  // Busca el estado usando el modelo Estado
>>>>>>> main

        // Verificar si la solicitud y el estado existen
        if (!solicitud) {
            return res.status(404).json({ message: 'Solicitud no encontrada' });
        }

        if (!estado) {
            return res.status(404).json({ message: 'Estado no encontrado' });
        }

        // Asignar el nuevo estado
        solicitud.estado_id = estado_id;
        await solicitud.save();

        res.status(200).json({ message: 'Estado asignado correctamente', solicitud });
    } catch (error) {
        console.error('Error al asignar estado:', error);
        res.status(500).json({ message: "Error al asignar estado", error: error.message });
    }
};