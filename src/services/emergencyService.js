const db = require('../models');

const createEmergency = async (temperature, humidity) => {
    try {
        const emergency = await db.Emergency.create({ temperature, humidity });
        return emergency;
    } catch (error) {
        throw new Error('Error al registrar la emergencia: ' + error.message);
    }
};

const getAllEmergencies = async () => {
    try {
        const emergencies = await db.Emergency.findAll();
        return emergencies;
    } catch (error) {
        throw new Error('Error al obtener las emergencias: ' + error.message);
    }
};

const getEmergencyById = async emerId => {
    try {
        const emergency = await db.Emergency.findByPk(emerId);
        return emergency;
    } catch (error) {
        throw new Error('Error al encontrar la emergencia: ' + error.message);
    }
};

const deleteEmergency = async emerId => {
    try {
        const emergency = await db.Emergency.findByPk(emerId);
        if (!emergency) {
            throw new Error('Emergencia no encontrada');
        }
        await emergency.destroy();
        return emergency;
    } catch (error) {
        throw new Error('Error al borrar la emergencia: ' + error.message);
    }
};

module.exports = {
    createEmergency,
    getAllEmergencies,
    getEmergencyById,
    deleteEmergency,
};
