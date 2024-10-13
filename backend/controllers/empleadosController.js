const jwt = require('jsonwebtoken');
const Empleado = require('../models/empleado');


// Login
exports.login = async (req, res) => {
    console.log(req.body)
    const { username, password } = req.body;

    try {
        const empleado = await Empleado.findOne({ where: { username } });

        if (!empleado) {
            return res.status(404).json({ message: "Usuario incorrecto" });
        }

        if (password != empleado.password) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            {
                id: empleado.idEmpleado,
                username: empleado.username,
            },
            'llave',
            {
                expiresIn: '1h',
            }
        );

        return res.json({ 
            nombre: `${empleado.nombre_empleado} ${empleado.apellido_empleado}`, 
            token: token 
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error en servidor " + error.message,
            stack: error.stack
        });
    }
};


// Verificar el token
exports.check = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token recibido:", token);

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, 'llave');
        const empleado = await Empleado.findByPk(decoded.id);

        if (!empleado) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        // Retorna información del empleado
        res.json({ nombre: `${empleado.nombre_empleado} ${empleado.apellido_empleado}` });
    } catch (error) {
        return res.status(403).json({ message: "Token inválido" }); 
    }
};

// Agregar empleado
exports.agregarEmpleado = async (req, res) => {
    try {
        const nuevoEmpleado = await Empleado.create(req.body);
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        res.status(500).json({
            message: "Error al agregar empleado: " + error.message,
            stack: error.stack
        });
    }
};
