const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    console.log('Token recibido:', token); 

    if (!token) {
        return res.status(401).json({ message: "Acceso bloqueado" });
    }

    try {
        const verify = jwt.verify(token, 'llave'); // Cambia 'llave' por tu clave secreta real
        req.user = verify; // Guarda la información del usuario en el request
        next(); // Continúa con el siguiente middleware o ruta
    } catch (error) {
        console.error('Error al verificar el token:', error); // Muestra el error en la consola
        res.status(401).json({ message: "Token invalido" });
    }
}
