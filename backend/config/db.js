//importamos sequelize 
const { Sequelize } = requiere('sequelize');

//pasamos parametros al constructor de sequelize
const sequelize = new Sequelize('cooperativa_db', 'root', '123456',{
    host: 'localhost',
    dialect: 'mysql'
});

