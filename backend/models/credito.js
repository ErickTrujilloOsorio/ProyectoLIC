const { sequelize, DataTypes } = require('../config/db.js');

const Credito = sequelize.define("Credito",
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
        descripcion_credito:{
            type: DataTypes.TEXT('medium'),
            allowNull: false
        }
    },
    {
        tableName: 'creditos'
    }
);

module.exports = Credito;