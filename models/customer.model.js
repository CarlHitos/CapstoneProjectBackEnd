const { Schema, model } = require("mongoose");

const customerSchema = new Schema(
    {
        customerEmail: {
            type: String,
            required: true,
            lowercase: true,
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
