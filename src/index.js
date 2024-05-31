const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const port = process.env.PORT || 3000;

const doorStatusRoutes = require('./routes/doorStatusRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');

app.use(cors());
app.use(express.json());

app.use('/door', doorStatusRoutes);
app.use('/api', emergencyRoutes);

app.get('/', (req, res) => {
    res.send('<h2>Hello world!</h2>');
});

db.sequelize
    .sync()
    .then(() => {
        console.log('Tablas sincronizadas');
        app.listen(port, () => {
            console.log(`Api listening on port ${port}`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar las tablas:', err);
    });

const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com'); // Cambia esto a tu servidor MQTT si es diferente
const emergencyService = require('./services/emergencyService');

mqttClient.on('connect', () => {
    console.log('Connected to MQTT broker');
    mqttClient.subscribe('home/door/emergency');
});

mqttClient.on('message', async (topic, message) => {
    if (topic === 'home/door/emergency') {
        try {
            const data = JSON.parse(message.toString());
            const { temperature, humidity } = data;
            await emergencyService.createEmergency(temperature, humidity);
            console.log('Emergency data saved to DB');
        } catch (error) {
            console.error('Error processing MQTT message:', error.message);
        }
    }
});

module.exports = mqttClient;
