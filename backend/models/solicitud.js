const { sequelize, DataTypes } = require('../config/db.js');
const Cliente = require('./cliente.js');
const Empleado = require('./empleado.js');
const Estado = require('./estado.js');
const Credito = require('./credito.js');

const Solicitud = sequelize.define(
    'Solicitud',
    {
        idSolicitud: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        cliente_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cliente, 
                key: 'idCliente'
            }
        },
        empleado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Empleado, 
                key: 'idEmpleado'
            }
        },
        estado_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Estado,   
                key: 'idEstado'  
            }
        },
        credito_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Credito,  
                key: 'idCredito' 
            }
        }
    },
    {
        tableName: 'solicitudes',
        timestamps: false
    }
);

module.exports = Solicitud;