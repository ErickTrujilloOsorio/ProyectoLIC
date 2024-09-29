const { Sequelize, Datatype, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Empleado = sequelize.define()(
    'Empleado',
    {
        idEmpleado:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre_empleado:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido_empleado:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        direccion_empleado:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        username:{
            type: DataTypes.STRING
            ,
            allowNull: false
        },
        salario:{
            type: DataTypes.DOUBLE(8,2),
            allowNull: false
        },
        correo_cliente:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        telefono_cliente:{
            type: DataTypes.STRING(8),
            allowNull: false
        },
        documento1:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        documento2:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        documento3:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        },
        idEstado:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)