var sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
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
        access: {
            type: DataTypes.BOOLEAN,
            defaultValue: null,
        },
    });
    return User;
};
