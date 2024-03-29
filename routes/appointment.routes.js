const router = require('express').Router();

const {
    getAllAppointment,
    createOneAppointment,
    getInfoAppointment,
    deleteOneAppointment
} = require('../controllers/appointment.controller')


router.get('/getAppointments', getAllAppointment);
router.post('/createAppointment', createOneAppointment);
router.get('/getInfo/:appointment_id', getInfoAppointment);
router.delete('/delete/:appointment_id', deleteOneAppointment);

module.exports = router;