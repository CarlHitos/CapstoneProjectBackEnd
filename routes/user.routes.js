const router = require('express').Router();

const {
    getUserProfile,
    editUserProfile,
    getUserAppointments,
    getUserAppointmentDetails,
    // createOneAppointment,
    cancelOneAppointment,
} = require('../controllers/user.controller')


router.get('/getUserProfile/:user_id', getUserProfile);
router.put('/editUserProfile/:user_id', editUserProfile);
router.get('/getUserAppointments/:user_id', getUserAppointments);
router.get('/getUserAppointmentDetails/:appointment_id', getUserAppointmentDetails);
// router.post('/createOneAppointment', createOneAppointment);
router.delete('/cancelOneAppointment/:appointment_id', cancelOneAppointment);

module.exports = router;