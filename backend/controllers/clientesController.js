const Cliente = require('../models/cliente');
const Solicitud = require('../models/solicitud');

// Agregar solictud
exports.agregarSolicitud = async (req, res) => {
    try {
        const { nombre_cliente, apellido_cliente, direccion_cliente, dui, salario, correo_cliente, telefono_cliente, documento1, documento2, documento3, estado_id, credito_id } = req.body;

        if (!nombre_cliente || !apellido_cliente || !direccion_cliente || !dui || !salario || !correo_cliente || !telefono_cliente || !documento1 || !documento2 || !documento3 || !estado_id) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        const cliente = await Cliente.create({
            nombre_cliente,
            apellido_cliente,
            direccion_cliente,
            dui,
            salario,
            correo_cliente,
            telefono_cliente,
            documento1,
            documento2,
            documento3,
            estado_id
        });

        const cliente_id = cliente.idCliente;

        const agregarSolicitud = await Solicitud.create({
            cliente_id: cliente_id,
            empleado_id: 1,
            estado_id: 3,
            credito_id: credito_id
        });

        res.status(201).json({ cliente, agregarSolicitud });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar al cliente: " + error.message });
    }
};

// Función para consultar todos los clientes
exports.consultarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({
            message: "Error al consultar los clientes: " + error.message,
            stack: error.stack
        });
    }
};

// Funcion para modificar un cliente
exports.actualizarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await cliente.update(req.body);
        res.json(cliente);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(e => {
                if (e.path === 'dui_UNIQUE') {
                    return 'Ya se encuentra registrado este DUI';
                } else if (e.path === 'correo_cliente_UNIQUE') {
                    return 'Ya se encuentra registrado este Correo';
                }
                return e.message;
            });
            return res.status(400).json({ message: errors.join(', ') });
        }
        res.status(500).json({
            message: "Error al actualizar el cliente: " + error.message,
            stack: error.stack
        });
    }
};

// Funcion para eliminar un cliente
exports.eliminarCliente = async (req, res) => {
    const id = req.params.id;

    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        await cliente.destroy();
        res.json({ message: "Cliente eliminado" });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente: " + error.message,
            stack: error.stack
        });
    }
};

// Funcion para agregar un cliente
exports.agregarCliente = async (req, res) => {
    try {
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(e => {
                if (e.path === 'dui_UNIQUE') {
                    return 'Ya se encuentra registrado este DUI';
                } else if (e.path === 'correo_cliente_UNIQUE') {
                    return 'Ya se encuentra registrado este Correo';
                }
                return e.message;
            });
            return res.status(400).json({ message: errors.join(', ') });
        }
        res.status(500).json({
            message: "Error al agregar el cliente: " + error.message,
            stack: error.stack
        });
    }
};