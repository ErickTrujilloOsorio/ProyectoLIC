const { sequelize, DataTypes } = require('../config/db.js');

const credito = sequelize.define("credito",
    {
        idCredito:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nombre_credito:{
            type: DataTypes.STRING(50),
            allowNull: false
        },
        interes:{
            type: DataTypes.DOUBLE(4,2),
            allowNull: false
        },
        descripcion_credito:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        }
    },
    {
        tableName: 'creditos'
    }
);

module.exports = credito;