const { sequelize, DataTypes } = require('../config/db.js');

const Empleado = sequelize.define('Empleado',
    {
        idEmpleado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_empleado: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido_empleado: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        direccion_empleado: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        correo_empleado: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        telefono_empleado: {
            type: DataTypes.STRING(8),
            allowNull: false
        },
        tipo_empleado_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'empleados',
        timestamps: false
    }
);

module.exports = Empleado;