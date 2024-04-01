const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "El nombre del servicio es obligatorio"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "El precio del servicio es obligatorio"]
        },
        duration: {
            type: Number,
            required: [true, "La duración del servicio es obligatoria"]
        },
        description: {
            type: String,
            required: [true, "La descripción del servicio es obligatoria"]
        },
        category: {
            type: String,
            enum: ['cut', 'beard', 'others'],
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false 
    }
);

const Service = model("Service", serviceSchema);

module.exports = Service;
