const emerService = require('../services/emergencyService');

const createEmer = async (req, res) => {
    const { temperature, humidity } = req.body;
    try {
        const emer = await emerService.createEmergency(temperature, humidity);
        res.status(201).json(emer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmergencies = async (req, res) => {
    try {
        const emergencies = await emerService.getAllEmergencies();
        res.status(200).json(emergencies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEmergency = async (req, res) => {
    const { emerId } = req.params;
    try {
        const emergency = await emerService.getEmergencyById(emerId);
        res.status(200).json(emergency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEmergency = async (req, res) => {
    const { emerId } = req.params;
    try {
        const deletedEmergency = await emerService.deleteEmergency(emerId);
        res.status(200).json(deletedEmergency);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createEmer,
    getEmergencies,
    getEmergency,
    deleteEmergency,
};
