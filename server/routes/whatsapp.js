const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const Appointment = require('../models/Appointment');

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

router.post('/incoming', async (req, res) => {
    const messageBody = req.body.Body;
    const from = req.body.From;

    // Aquí puedes agregar la lógica para manejar los mensajes entrantes
    console.log(`Received message: ${messageBody} from ${from}`);

    // Ejemplo: Responder al mensaje
    client.messages.create({
        body: 'Gracias por tu mensaje. Estamos procesando tu solicitud.',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: from
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error(error));

    // Ejemplo: Guardar una cita en la base de datos
    const appointment = new Appointment({
        clientName: 'Cliente Ejemplo',
        tattooDescription: 'Descripción del tatuaje',
        appointmentDate: new Date(),
        contactNumber: from
    });

    try {
        await appointment.save();
        console.log('Appointment saved successfully');
    } catch (error) {
        console.error('Error saving appointment:', error);
    }

    res.sendStatus(200);
});

module.exports = router;
