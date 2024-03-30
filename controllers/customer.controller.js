const { Types } = require("mongoose");
const Customer = require("../models/customer.model");
const Appointment = require("../models/appointment.model");

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
};

const getOneCustomer = async (req, res, next) => {
    try {
        const { customer_id } = req.params;

        if (!Types.ObjectId.isValid(customer_id)) {
            return res.status(400).json({ msg: 'Invalid customer id!' });
        }

        const customer = await Customer.findById(customer_id);

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found!' });
        }

        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}
const editOneCustomer = async (req, res, next) => {
    try {
        const { customer_id } = req.params;

        if (!Types.ObjectId.isValid(customer_id)) {
            return res.status(400).json({ msg: 'Invalid customer id!' });
        }

        const customer = await Customer.findByIdAndUpdate(customer_id);
        
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found!' });
        }

        res.status(200).json(customer)
    } catch (err) {
        next(err);
    }
}
const deleteOneCustomer = async (req, res, next) => {
    try {
        const { customer_id } = req.params;

        if (!Types.ObjectId.isValid(customer_id)) {
            return res.status(400).json({ msg: 'Invalid customer id!' });
        }

        const customer = await Customer.findByIdAndUpdate(customer_id);
        
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found!' });
        }

        await Appointment.findByIdAndDelete(customer);

        res.json({ message: 'Cliente eliminado' });
    } catch (err) {
        next(err);
    }
}
const cancelAppointment = async (req, res, next) => {
    try {
        const { appointment_id } = req.params;

        if (!Types.ObjectId.isValid(appointment_id)) {
            return res.status(400).json({ msg: 'Invalid appointment id!' });
        }

        const appointment = await Appointment.findById(appointment_id);
        
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found!' });
        }

        // Verificar si el usuario autenticado es el propietario de la cita
        if (appointment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ msg: 'You are not authorized to cancel this appointment!' });
        }

        await Appointment.findByIdAndDelete(appointment_id);

        res.json({ message: 'Appointment canceled successfully' });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllCustomers,
    getOneCustomer,
    editOneCustomer,
    deleteOneCustomer,
    cancelAppointment
};