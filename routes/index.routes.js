const router = require('express').Router();
// const barbershopRoutes = require('./barbershop.routes');
const servicesRoutes = require('./services.routes');
const appointmentRoutes = require('./appointment.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const customerRoutes = require('./customer.routes');

// router.use('/barbershop', barbershopRoutes);
router.use('/services', servicesRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);

module.exports = router;