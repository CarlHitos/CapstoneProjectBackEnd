const router = require('express').Router();

const {
    getAllAppointment,
    createOneAppointment,
    getInfoAppointment,
    deleteOneAppointment
} = require('../controllers/appointment.controller')


router.get('/getAppointments', getAllAppointment);
router.post('/createAppointment', createOneAppointment);
router.get('/Appointment/:appointment_id', getInfoAppointment);
router.delete('/Appointment/:appointment_id', deleteOneAppointment);

module.exports = router;