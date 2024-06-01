const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com'); // Cambia esto a tu servidor MQTT si es diferente

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('puerta/inteligente/iot/osmin/y/leo/emergencias');
});

module.exports = mqttClient;
