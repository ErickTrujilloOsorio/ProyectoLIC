const { sequelize, DataTypes } = require('../config/db.js');

const tipoEmpleado = sequelize.define(
    'tipoEmpleado',
    {
        idTipo_empleado:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        tipo_empleado:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        empleado_id:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        }
    },
    {
        tableName: 'tipos_empleados'
    }
);

module.exports = tipoEmpleado;