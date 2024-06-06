const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    clientName: String,
    tattooDescription: String,
    appointmentDate: Date,
    contactNumber: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
