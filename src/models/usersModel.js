const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../database.sqlite',
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rfid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    acceso: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

module.exports = User