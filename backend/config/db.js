// Importamos Sequelize 
const { Sequelize, DataTypes } = require('sequelize');

// Inicializamos objeto de conexion a bd
const sequelize = new Sequelize('cooperativa_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// Probamos conexión
sequelize.authenticate()
    .then(() => console.log('HAY CONEXION'))
    .catch(e => console.error('No BD ' + e));

// Exportamos instancia
module.exports = { sequelize, DataTypes };