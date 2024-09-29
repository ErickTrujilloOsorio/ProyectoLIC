const { Sequelize, Datatype, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const tipoEmpleado = sequelize.define()(
    'tipoEmpleado',
    {
        idTipo_empleado:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tipo_empleado:{
            type: DataTypes.STRING(30),
            allowNull: false
        },
        empleado_id:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        }
    }
)