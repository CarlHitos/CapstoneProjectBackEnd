const router = require('express').Router();
const passport = require('passport');

const {
    getAllUsers,
    getUserProfile,
    editUserProfile,
    getUserAppointments,
    getUserAppointmentDetails,
    updateAppointmentStatus,
} = require('../controllers/user.controller')

router.get('/getAllUsers', getAllUsers);

const jwtPassport = [passport.authenticate('jwt', { session: false })]
router.get('/getUserProfile/:user_id',  jwtPassport,  getUserProfile);
router.put('/editUserProfile/:user_id',  jwtPassport, editUserProfile);
router.get('/getUserAppointments/:user_id',  jwtPassport, getUserAppointments);
router.get('/getUserAppointmentDetails/:appointment_id',  jwtPassport, getUserAppointmentDetails);
router.put('/updateAppointmentStatus/:appointment_id',  jwtPassport, updateAppointmentStatus);

module.exports = router;