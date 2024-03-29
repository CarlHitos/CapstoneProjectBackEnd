const { Types } = require('mongoose');
const Barber = require('../models/barber.model');
const Appointment = require('../models/appointment.model');

const getBarberProfile = async (req, res, next) => {
    try {
        const { barber_id } = req.params;

        if (!Types.ObjectId.isValid(barber_id)) {
            return res.status(400).json({ message: 'Invalid barber id' });
        }

        const barber = await Barber.findById(req.params.barber_id);

        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }

        res.json(barber);
    } catch (error) {
        next(error);
    }
};

const editBarberProfile = async (req, res, next) => {
    try {
        const { barber_id } = req.params;

        if (!Types.ObjectId.isValid(barber_id)) {
            return res.status(400).json({ message: 'Invalid barber id' });
        }

        const barber = await Barber.findByIdAndUpdate(barber_id, req.body, { new: true });
        if (!barber) {
            return res.status(404).json({ message: 'Barbero no encontrado' });
        }
        res.json(barber);
    } catch (error) {
        next(error);
    }
};

const getBarberAppointments = async (req, res, next) => {
    try {
        const { barber_id } = req.params;

        if (!Types.ObjectId.isValid(barber_id)) {
            return res.status(400).json({ message: 'Invalid barber id' });
        }

        const barber = await Barber.findById(barber_id);
        if (!barber) {
            return res.status(404).json({ message: 'Barber not found' });
        }

        const appointments = await Appointment.find({ barber: barber_id });

        res.json({ barber, appointments });
    } catch (error) {
        next(error);
    }
};

const getBarberAppointmentDetails = async (req, res, next) => {
    try {
        const { appointment_id } = req.params;

        if (!Types.ObjectId.isValid(appointment_id)) {
            return res.status(400).json({ message: 'Invalid appointment id' });
        }

        const appointment = await Appointment.findById(appointment_id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.barber.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        res.json(appointment);
    } catch (error) {
        next(error);
    }
};


// const createOneAppointment = async (req, res, next) => {
//     try {
//         // Extraer los datos de la cita desde el cuerpo de la solicitud
//         const { barber, customer, date, service, status, notes } = req.body;

//         // Validar los datos de entrada (puedes agregar más validaciones según sea necesario)

//         // Verificar si la fecha y hora de la cita están disponibles para el barbero
//         const isAvailable = await checkAvailability(barber, date);
//         if (!isAvailable) {
//             return res.status(400).json({ message: 'La fecha y hora de la cita no están disponibles' });
//         }

//         // Crear una nueva cita en la base de datos
//         const appointment = await Appointment.create({
//             barber,
//             customer,
//             date,
//             service,
//             status,
//             notes
//         });

//         // Devolver una respuesta indicando que la cita ha sido creada exitosamente
//         res.status(201).json({ message: 'Nueva cita creada exitosamente', appointment });
//     } catch (error) {
//         next(error);
//     }
// };

// // Función para verificar la disponibilidad de la fecha y hora para el barbero
// const checkAvailability = async (barberId, date) => {
//     // Implementa la lógica para verificar la disponibilidad de la fecha y hora para el barbero
//     // Por ejemplo, puedes buscar citas existentes para el barbero en la fecha y hora especificadas
//     // y devolver true si la fecha y hora están disponibles y false si no lo están.
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

        // Verificar si la cita pertenece al barbero actual, COMPROBAR CUANDO FUNCIONE EL LOGIN
        if (appointment.barber.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await Appointment.findByIdAndDelete(appointment_id);

        res.json({ message: 'Cita cancelada por el barbero' });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    getBarberProfile,
    editBarberProfile,
    getBarberAppointments,
    getBarberAppointmentDetails,
    // createOneAppointment,
    cancelOneAppointment
};
