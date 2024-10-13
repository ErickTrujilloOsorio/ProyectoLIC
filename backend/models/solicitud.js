const { sequelize, DataTypes } = require('../config/db.js');
const cliente = require('./cliente.js');
const credito = require('./credito.js');
const estado = require('./estado.js');
const empleado = require('./empleado.js');

const solicitud = sequelize.define(
    'solicitud',
    {
        idSolicitud:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cliente_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'idCliente'
            }
        },
        empleado_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'empleados',
                key: 'idEmpleado'
            }
        },
        estado_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'estados',
                key: 'idEstado'
            }
        },
        credito_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'creditos',
                key: 'idCredito'
            }
        }
    },
    {
        tableName: 'solicitudes',
        timestamps: false
    }
);

module.exports = solicitud;