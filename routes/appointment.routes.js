const router = require('express').Router();
const passport = require('passport');
const { isAdminMiddleware, isUserMiddleware } = require('../middleware/auth.middleware');

const {
    getAllAppointment,
    createOneAppointment,
    getBarberAppointments,
    deleteOneAppointment
} = require('../controllers/appointment.controller')


router.get('/getAppointments', getAllAppointment);
router.post('/createAppointment', createOneAppointment);
router.get('/barberAppointments', getBarberAppointments);
router.delete('/delete/:appointment_id', [passport.authenticate('jwt', { session: false }), isAdminMiddleware], deleteOneAppointment);

module.exports = router;