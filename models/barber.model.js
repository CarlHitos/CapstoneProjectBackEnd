const { Schema, model } = require("mongoose");

const barberSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre del barbero es obligatorio"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "El correo electrónico del barbero es obligatorio"],
            trim: true
        },
        phone: {
            type: String,
            required: [true, "El teléfono del barbero es obligatorio"],
            trim: true
        },
        schedule: {
            type: {
                days: [String],
                hours: {
                    start: String, 
                    end: String   
                }
            },
            required: [true, "El horario del barbero es obligatorio"]
        }
    },
    {
        timestamps: true,
        versionKey: false 
    }
);

const Barber = model("Barber", barberSchema);

module.exports = Barber;
