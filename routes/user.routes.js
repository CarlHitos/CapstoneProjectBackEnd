const router = require('express').Router();

const {
    getUserProfile,
    editUserProfile,
    getUserAppointments,
    getUserAppointmentDetails,
    updateAppointmentStatus,
} = require('../controllers/user.controller')


router.get('/getUserProfile/:user_id', getUserProfile);
router.put('/editUserProfile/:user_id', editUserProfile);
router.get('/getUserAppointments/:user_id', getUserAppointments);
router.get('/getUserAppointmentDetails/:appointment_id', getUserAppointmentDetails);
router.put('/updateAppointmentStatus/:appointment_id', updateAppointmentStatus);

module.exports = router;