const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
    {
        barber: {
            type: String,
            required: [true, "El nombre del barbero es obligatorio"],
            trim: true
        },
        customer: {
            type: String,
            required: [true, "El nombre del cliente es obligatorio"],
            trim: true
        },
        date: {
            type: Date,
            required: [true, "La fecha del cita es obligatoria"]
        },
        service: {
            type: String,
            required: [true, "El tipo de servicio es obligatorio"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "El precio del cita es obligatorio"]
        },
        email: {
            type: String,
            required: [true, "El correo electrónico del cliente es obligatorio"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "El teléfono del cliente es obligatorio"],
            trim: true
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        },
        notes: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false 
    }
);

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
