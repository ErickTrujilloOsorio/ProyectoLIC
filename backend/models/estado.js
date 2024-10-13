const { sequelize, DataTypes } = require('../config/db.js');

const estado = sequelize.define('estado',
    {
        idEstado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_estado: {
            type: DataTypes.STRING(12),
            allowNull: false
        },
        descripcion_estado: {
            type: DataTypes.TEXT('medium'),
            allowNull: false
        }
    },
    {
        tableName: 'estados',
        timestamps: false
    }
);

module.export = estado;