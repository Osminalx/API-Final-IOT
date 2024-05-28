const mqtt = require('mqtt');
const db = require('../models'); // Asegúrate de ajustar la ruta según la estructura de tu proyecto
const { createEmergency } = require('./emergencyService'); // Asegúrate de ajustar la ruta según la estructura de tu proyecto

const mqttClient = mqtt.connect('mqtt://broker.hivemq.com'); // Cambia esto a tu servidor MQTT si es diferente

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('home/door/sensor', err => {
        if (err) {
            console.error('Error subscribing to topic: ', err);
        } else {
            console.log('Subscribed to home/door/sensor');
        }
    });
});

mqttClient.on('message', async (topic, message) => {
    if (topic === 'home/door/sensor') {
        const payload = JSON.parse(message.toString());
        const { temperature, humidity } = payload;

        console.log(`Received sensor data - Temperature: ${temperature}, Humidity: ${humidity}`);

        if (temperature > 30.0 || humidity < 30.0) {
            try {
                await createEmergency(temperature, humidity);

                // Actualiza todos los usuarios para que tengan acceso a la puerta
                const users = await db.User.findAll();
                for (const user of users) {
                    await user.update({ access: true });
                }

                // Publica un mensaje a Arduino para actualizar permisos
                const accessMessage = JSON.stringify({ access: true });
                mqttClient.publish('home/door/access', accessMessage);

                console.log('Emergency created, users updated, and access message sent');
            } catch (error) {
                console.error('Error handling emergency: ', error.message);
            }
        }
    }
});

module.exports = mqttClient;
