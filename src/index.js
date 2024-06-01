const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const port = process.env.PORT || 3000;

const doorStatusRoutes = require('./routes/doorRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const emergencyService = require('./services/emergencyService');

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/door', doorStatusRoutes);
app.use('/emergencies', emergencyRoutes);

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

// Importar el cliente MQTT
const mqttClient = require('./mqttClient');

// Manejar mensajes de emergencia
mqttClient.on('message', async (topic, message) => {
    if (topic === 'puerta/inteligente/iot/osmin/y/leo/emergencias') {
        try {
            console.log('Received message:', message.toString());

            const data = JSON.parse(message.toString());
            const { temperature, humidity } = data;

            // Verificar que humidity no sea nulo
            if (humidity != null) {
                await emergencyService.createEmergency(temperature, humidity);
                console.log('Emergency data saved to DB');
            } else {
                console.error('Error processing MQTT message: Humidity is null');
            }
        } catch (error) {
            console.error('Error processing MQTT message:', error.message);
        }
    }
});



module.exports = app;
