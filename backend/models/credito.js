const { Sequelize, Datatype, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Credito = sequelize.define(
    "Credito",{
        idCredito:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre_credito:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        descripcion_credito:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        }
    }
);