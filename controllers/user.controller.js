const { Types } = require('mongoose');
const Appointment = require('../models/appointment.model');
const User = require('../models/user.model');

const getUserProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid User id' });
        }

        if (user_id !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(req.params.user_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const editUserProfile = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        if (user_id !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const user = await User.findByIdAndUpdate(user_id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        next(error);
    }
};

const getUserAppointments = async (req, res, next) => {
    try {
        const { user_id } = req.params;

        if (!Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user id' });
        }

        if (user_id !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const appointments = await Appointment.find({ user: user_id });

        res.json({ user, appointments });
    } catch (error) {
        next(error);
    }
};

const getUserAppointmentDetails = async (req, res, next) => {
    try {
        const { appointment_id } = req.params;

        if (!Types.ObjectId.isValid(appointment_id)) {
            return res.status(400).json({ message: 'Invalid appointment id' });
        }

        const appointment = await Appointment.findById(appointment_id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.json(appointment);
    } catch (error) {
        next(error);
    }
};


// const createOneAppointment = async (req, res, next) => {
//     try {
//         const { user, customer, date, service, status, notes } = req.body;

//         const isAvailable = await checkAvailability(user, date);
//         if (!isAvailable) {
//             return res.status(400).json({ message: 'La fecha y hora de la cita no están disponibles' });
//         }

//         // Crear una nueva cita en la base de datos
//         const appointment = await Appointment.create({
//             user,
//             customer,
//             date,
//             service,
//             status,
//             notes
//         });

//         res.status(201).json({ message: 'Nueva cita creada exitosamente', appointment });
//     } catch (error) {
//         next(error);
//     }
// };

const cancelOneAppointment = async (req, res, next) => {
    try {
        const { appointment_id } = req.params;

        if (!Types.ObjectId.isValid(appointment_id)) {
            return res.status(400).json({ message: 'Invalid appointment id' });
        }

        const appointment = await Appointment.findById(appointment_id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.json({ message: 'Cita cancelada correctamente' });
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getUserProfile,
    editUserProfile,
    getUserAppointments,
    getUserAppointmentDetails,
    // createOneAppointment,
    cancelOneAppointment
};
