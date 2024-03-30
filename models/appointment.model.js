const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "El barbero es obligatorio"]
        },
        customer: {
            type: String, 
            ref: "Customer",
            required: [true, "El cliente es obligatorio"]
        },
        date: {
            type: Date,
            required: [true, "La fecha de la cita es obligatoria"]
        },
        dateEnd: { 
            type: Date, 
            required: true 
        },
        service: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: [true, "El servicio es obligatorio"]
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
