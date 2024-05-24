var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Emergency = sequelize.define('Emergency', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        temperature: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        humidity: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    });
    return Emergency;
};
