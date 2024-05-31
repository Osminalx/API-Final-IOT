const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../../database.sqlite'), 
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.DoorStatus = require('./doorStatusModel')(sequelize,DataTypes);
db.Emergency = require('./emergencyModel')(sequelize, DataTypes);

module.exports = db;
