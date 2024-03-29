const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
    {
        _id: {
            type: String, 
            required: [true, "El correo electrónico del cliente es obligatorio"],
            trim: true
        },
        customerName: {
            type: String,
            required: [true, "El nombre del cliente es obligatorio"],
            trim: true
        },
        customerPhone: {
            type: String,
            required: [true, "El teléfono del cliente es obligatorio"],
            trim: true
        }
    },
    {
        timestamps: true,
        versionKey: false 
    }
);

const Customer = model("Customer", customerSchema);

module.exports = Customer;
