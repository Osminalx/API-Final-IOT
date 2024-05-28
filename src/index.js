const express = require('express');
const cors = require('cors'); // Importa cors
const app = express();
const db = require('./models');
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

app.use('/users', userRoutes);

//app.user('/emergency', emergencyRoutes)

app.get('/', (req, res) => {
    res.send("<h2>Hello world!</h2>");
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

// MQTT Configuration (adjust paths accordingly)
const mqtt = require('mqtt');
const { createEmergency } = require('./services/emergencyService'); // Ajusta la ruta según tu estructura

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
