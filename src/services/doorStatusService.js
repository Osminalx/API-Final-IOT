const db = require('../models');

const db = require('../models');

const getDoorStatus = async () => {
    try {
        const doorStatus = await db.DoorStatus.findOne({ where: { id: 1 } });
        return doorStatus;
    } catch (error) {
        throw new Error('Error al obtener el estado de la puerta: ' + error.message);
    }
};

const updateDoorStatus = async newStatus => {
    try {
        let doorStatus = await db.DoorStatus.findOne({ where: { id: 1 } });
        if (!doorStatus) {
            doorStatus = await db.DoorStatus.create({ status: newStatus });
        } else {
            await doorStatus.update({ status: newStatus });
        }
        return doorStatus;
    } catch (error) {
        throw new Error('Error al actualizar el estado de la puerta: ' + error.message);
    }
};

module.exports = {
    getDoorStatus,
    updateDoorStatus,
};
