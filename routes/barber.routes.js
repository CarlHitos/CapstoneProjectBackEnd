const router = require('express').Router();

const {
    getBarberProfile,
    editBarberProfile,
    getBarberAppointments,
    getBarberAppointmentDetails,
    // createOneAppointment,
    cancelOneAppointment,
} = require('../controllers/barber.controller')


router.get('/getBarberProfile/:barber_id', getBarberProfile);
router.put('/editBarberProfile/:barber_id', editBarberProfile);
router.get('/getBarberAppointments/:barber_id', getBarberAppointments);
router.get('/getBarberAppointmentDetails/:appointment_id', getBarberAppointmentDetails);
// router.post('/createOneAppointment', createOneAppointment);
router.delete('/cancelOneAppointment/:appointment_id', cancelOneAppointment);

module.exports = router;