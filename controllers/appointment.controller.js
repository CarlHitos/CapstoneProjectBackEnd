const { Types } = require('mongoose');
const Appointment = require('../models/appointment.model');
const Customer = require('../models/customer.model');
const Service = require('../models/service.model');

const getAllAppointment = async (req, res, next) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (err) {
        next(err);
    }
};

const createOneAppointment = async (req, res, next) => {
    try {
        const serviceIdQuery = {
            _id: req.body.service,
        }

        const service = await Service.findById(serviceIdQuery);

        const dateStart = new Date(req.body.date);
        const dateEnd = new Date(dateStart.getTime() + service.duration * 60000);

        const appointmentOverlapQuery = {
            barber: req.body.barber,
            $or: [
                { date: { $gte: dateStart, $lt: dateEnd } },
                { dateEnd: { $gt: dateStart, $lte: dateEnd } }
            ]
        };

        const existingAppointments = await Appointment.find(appointmentOverlapQuery);

        if (existingAppointments.length > 0) {
            return res.status(400).json({ error: 'Ya hay una cita programada para esta hora y fecha.' });
        }

        let customer = await Customer.findById(req.body._id);
        if (!customer) {

            customer = await Customer.create({
                _id: req.body._id,
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone
            });
        }

        await Appointment.create({
            barber: req.body.barber,
            customer: customer._id,
            date: dateStart,
            dateEnd: dateEnd,
            service: req.body.service,
            status: req.body.status,
            notes: req.body.notes
        });

        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};


const getInfoAppointment = async (req, res, next) => {
    try {
        const { appointment_id } = req.params;

        if (!Types.ObjectId.isValid(appointment_id)) {
            return res.status(400).json({ msg: 'Invalid appointment id!' });
        }
        
        const appointment = await Appointment.findById(appointment_id);

        if (!appointment) {
            return res.status(404).json({ msg: 'Appointment not found!' });
        }
        
        res.status(200).json(appointment);
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
