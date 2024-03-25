const { Types } = require('mongoose');
const Appointment = require('../models/appointment.model');

const getAllAppointment = async (req, res, next) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        next(err);
    }
};

const createOneAppointment = async (req, res, next) => {
    const {
        barber,
        customer,
        date,
        service,
        price,
        email,
        phone,
        notes
    } = req.body;
    try {
        if (!barber || !customer || !date || !service || !price || !email || !phone) {
            return res.status(400).json({ msg: 'Por favor, completa todos los campos requeridos' });
        }

        const newAppointment = await Appointment.create({
            barber,
            customer,
            date,
            service,
            price,
            email,
            phone,
            notes
        });

        res.status(201).json({
            msg: 'Cita creada exitosamente',
            appointment: newAppointment
        });
    } catch (err) {
        next(err);
    }
};

const getInfoAppointment = async (req, res, next) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!Types.ObjectId.isValid(appointment)) {
            return res.status(400).json({ msg: 'Invalid appointment id!' });
        }

        if (appointment == null) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json(appointment);
    } catch (err) {
        next(err);
    }
};

const deleteOneAppointment = async (req, res, next) => {
    try {
        const { appointment_id } = req.params;

        if (!Types.ObjectId.isValid(appointment_id)) {
            return res.status(400).json({ msg: 'Invalid appointment id!' });
        }
        const appointment = await Appointment.findByIdAndDelete(appointment_id);
        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found!' });
        }
        res.status(200).json({ msg: 'Appointment successfully deleted!' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllAppointment,
    createOneAppointment,
    getInfoAppointment,
    deleteOneAppointment
};
