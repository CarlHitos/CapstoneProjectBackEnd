const router = require('express').Router();

const {
    getAllCustomers,
    getOneCustomer,
    editOneCustomer,
    deleteOneCustomer,
    cancelAppointment
} = require('../controllers/customer.controller')


router.get('/getAllCustomers', getAllCustomers);
router.get('/getOneCustomer/:customer_id', getOneCustomer);
router.put('/editOneCustomer/:customer_id', editOneCustomer);
router.delete('/deleteOneCustomer/:customer_id', deleteOneCustomer);
router.delete('/cancelAppointment/:appointment_id', cancelAppointment);

module.exports = router;