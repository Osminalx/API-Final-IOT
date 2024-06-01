module.exports = (sequelize, DataTypes) => {
    const DoorStatus = sequelize.define('DoorStatus', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return DoorStatus;
};
