const express = require('express');
const router = express.Router();
const doorStatusController = require('../controllers/doorStatusController');
const mqttClient = require('../mqttClient'); // Importar el cliente MQTT


router.get('/', doorStatusController.getDoorStatus);

router.put('/', (req, res) => {
    const { status } = req.body;

    doorStatusController.updateDoorStatus(status)
        .then(result => {
            if (mqttClient && mqttClient.connected) {
                mqttClient.publish('puerta/inteligente/iot/osmin/y/leo/status', JSON.stringify({ status }));
                console.log(`Publicado en MQTT: ${status}`);
            } else {
                console.error('mqttClient no está conectado o es undefined');
            }
            res.json(result);
        })
        .catch(error => {
            console.error('Error actualizando el estado de la puerta:', error);
            res.status(500).json({ error: error.message });
        });
});
// Nueva ruta POST para crear el estado de la puerta
router.post('/', doorStatusController.createDoorStatus);

module.exports = router;
