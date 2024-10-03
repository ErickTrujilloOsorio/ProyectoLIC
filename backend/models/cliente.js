const { sequelize, DataTypes } = require('../config/db.js');

const cliente = sequelize.define('cliente',
    {
        idCliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre_cliente: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido_cliente: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        direccion_cliente: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        dui: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        salario: {
            type: DataTypes.DOUBLE(8, 2),
            allowNull: false
        },
        correo_cliente: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        telefono_cliente: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        documento1: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        documento2: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        documento3: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'clientes',
        timestamps: false
    }
);

// Exportamos
module.exports = cliente;
