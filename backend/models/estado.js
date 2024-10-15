const { sequelize, DataTypes } = require('../config/db.js');

const Estado = sequelize.define('Estado',
    {
        idEstado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        estado: {
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

module.exports = Estado;