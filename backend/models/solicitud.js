const { Sequelize, Datatype, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Solicitud = sequelize.define()(
    'Solicitud',
    {
        idSolicitud:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cliente_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        empleado_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        credito_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)