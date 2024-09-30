const { sequelize, DataTypes } = require('../config/db.js');

const Solicitud = sequelize.define(
    'Solicitud',
    {
        idSolicitud:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
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
    },
    {
        tableName: 'solicitudes'
    }
);

module.exports = Solicitud;