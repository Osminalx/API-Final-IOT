const express = require('express');
const app = express();
const db = require('./models');
const port = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoutes');

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
