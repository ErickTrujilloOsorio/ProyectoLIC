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


exports.obtenerClientePorId = async (req, res) => {
    const { idCliente } = req.params;
    try {
        const cliente = await Cliente.findByPk(idCliente);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        console.log(cliente);
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Error al obtener el cliente:', error);
        res.status(500).json({ message: "Error al obtener el cliente", error: error.message });
    }
};
