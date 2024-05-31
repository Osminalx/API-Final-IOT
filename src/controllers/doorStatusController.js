const doorStatusService = require('../services/doorStatusService');
const mqttClient = require('../mqttClient'); // Asegúrate de ajustar la ruta

const getDoorStatus = async (req, res) => {
    try {
        const doorStatus = await doorStatusService.getDoorStatus();
        res.status(200).json(doorStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDoorStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const updatedDoorStatus = await doorStatusService.updateDoorStatus(status);

        // Publica el nuevo estado en MQTT
        mqttClient.publish('puerta/inteligente/iot/osmin/y/leo/status', JSON.stringify({ status }));

        res.status(200).json(updatedDoorStatus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDoorStatus,
    updateDoorStatus,
};
