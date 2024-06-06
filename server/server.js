require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to MongoDB Atlas: ${err}`);
});

// Rutas
const scheduleRoute = require('./routes/schedule');
app.use('/schedule', scheduleRoute);

const whatsappRoute = require('./routes/whatsapp');
app.use('/whatsapp', whatsappRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
