const doorStatusService = require('../services/doorStatusService');
const { DoorStatus } = require('../models');

const getDoorStatus = async (req, res) => {
    try {
        const doorStatus = await doorStatusService.getDoorStatus();
        res.status(200).json(doorStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDoorStatus = async status => {
    try {
        const updatedStatus = await DoorStatus.update({ status }, { where: { id: 1 } });
        return { status: 'success', data: updatedStatus };
    } catch (error) {
        throw new Error('Error updating door status');
    }
};

// Nueva función para crear el estado de la puerta
const createDoorStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const newDoorStatus = await doorStatusService.createDoorStatus(status);
        res.status(201).json(newDoorStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDoorStatus,
    updateDoorStatus,
    createDoorStatus,
};
