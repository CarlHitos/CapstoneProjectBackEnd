const { Types } = require('mongoose');
const Appointment = require('../models/appointment.model');
const Customer = require('../models/customer.model');
const Service = require('../models/service.model');
const User = require('../models/user.model');
const moment = require('moment');

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

        const userData = await User.findById(req.body.user);
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        const appointmentDay = new Date(dateStart).toLocaleDateString('en-US', { weekday: 'long' });
        if (!userData.schedule.days.includes(appointmentDay)) {
            return res.status(400).json({ error: 'El barbero no está disponible en este día.' });
        }

        const appointmentTime = moment.utc(dateStart).format('HH:mm');
        const scheduleStart = userData.schedule.hours.start;
        const scheduleEnd = userData.schedule.hours.end;

        if (moment(appointmentTime, 'HH:mm').isBefore(moment(scheduleStart, 'HH:mm')) || moment(appointmentTime, 'HH:mm').isAfter(moment(scheduleEnd, 'HH:mm'))) {
            return res.status(400).json({ error: 'El barbero no está disponible en este horario.' });
        }

        const appointmentOverlapQuery = {
            user: req.body.user,
            $or: [
                { date: { $gte: dateStart, $lt: dateEnd } },
                { dateEnd: { $gt: dateStart, $lte: dateEnd } }
            ]
        };

        const existingAppointments = await Appointment.find(appointmentOverlapQuery);

        if (existingAppointments.length > 0) {
            return res.status(400).json({ error: 'Ya hay una cita programada para esta hora y fecha.' });
        }

        let customer = await Customer.findOne({ customerEmail: req.body.customerEmail });
        if (!customer) {

            customer = await Customer.create({
                customerEmail: req.body.customerEmail,
                customerName: req.body.customerName,
                customerPhone: req.body.customerPhone
            });
        }

        await Appointment.create({
            user: req.body.user,
            customer: req.body.customerEmail,
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

const getBarberAppointments = async (req, res, next) => {
    try {
        const { user_id, date } = req.query;
        console.log('user >>', user_id, ' date >>', date)

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ msg: 'Invalid appointment id!' });
        }

        const searchDate = new Date(date);

        const appointments = await Appointment.find({
            user: user_id,
            date: {
                $gte: new Date(searchDate.setHours(0, 0, 0)),
                $lt: new Date(searchDate.setHours(23, 59, 59))
            }
        });

        console.log('appointments >>', appointments)
        res.json(appointments);
    } catch (error) {
        next(error);
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
    getBarberAppointments,
    deleteOneAppointment
};
