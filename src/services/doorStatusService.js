const db = require('../models');

const getDoorStatus = async () => {
    return await db.DoorStatus.findAll();
};

const updateDoorStatus = async status => {
    const doorStatus = await db.DoorStatus.findOne();
    if (doorStatus) {
        doorStatus.status = status;
        await doorStatus.save();
        return doorStatus;
    }
    throw new Error('Door status not found');
};

// Nueva función para crear el estado de la puerta
const createDoorStatus = async status => {
    return await db.DoorStatus.create({ status });
};

module.exports = {
    getDoorStatus,
    updateDoorStatus,
    createDoorStatus,
};
