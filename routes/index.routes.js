const router = require('express').Router();
// const barbershopRoutes = require('./barbershop.routes');
// const servicesRoutes = require('./services.routes');
const appointmentRoutes = require('./appointment.routes');
// const usersRoutes = require('./users.routes');
// const authRoutes = require('./auth.routes');

// router.use('/barbershop', barbershopRoutes);
// router.use('/services', servicesRoutes);
router.use('/appointment', appointmentRoutes);
// router.use('/users', usersRoutes);
// router.use('/auth', authRoutes);

module.exports = router;