const { Sequelize, Datatype, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Estado = sequelize.define()(
    'Estado',
    {
        idEstado:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado:{
            type: DataTypes.STRING(12),
            allowNull: false
        },
        descripcion_estado:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        }
    }
)