const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../database.sqlite',
});

const Emergency = sequelize.define('Emergency', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    temperatura: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    humedad: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
});

sequelize
    .sync()
    .then(() => {
        console.log('Tablas sincronizadas');
    })
    .catch(err => {
        console.error('Error al sincronizar las tablas:', err);
    });

module.exports = Emergency;
