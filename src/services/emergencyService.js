const db = require('../models');

const createEmergency = async (temp, hum) => {
    try {
        const emergency = await db.Emergency.create({ temp, hum });
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
        throw new Error('Error al encontrar la emergencia' + error.message);
    }
};


const deleteEmergency = async emerId => {
    try {
        const emergency = await db.Emergency.findByPk(emerId);
        if (!emergency) {
            throw new Error('Usuario no encontrado');
        }
        await emergency.destroy();
        return emergency;
    } catch (error) {
        throw new Error('Error al borrar el usuario: ' + error.message);
    }
};

module.exports = {
    createEmergency,
    getAllEmergencies,
    getEmergencyById,
    deleteEmergency
}