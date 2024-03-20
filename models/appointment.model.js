const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    barber: { type: String, required: true },
    customer: { type: String, required: true },
    date: { type: Date, required: true },
    service: { type: String, required: true },
    duration: { type: Number, default: 30 }, 
    price: { type: Number, required: true }, 
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }, 
    notes: { type: String }, 
});

module.exports = mongoose.model('Appointment', appointmentSchema);
