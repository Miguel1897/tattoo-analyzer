const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
    const appointment = new Appointment({
        clientName: req.body.clientName,
        tattooDescription: req.body.tattooDescription,
        appointmentDate: req.body.appointmentDate,
        contactNumber: req.body.contactNumber,
    });

    try {
        const newAppointment = await appointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
