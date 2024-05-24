var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
            defaultValue: sequelize.NOW,
        },
    });
    return Emergency;
};
