const router = require('express').Router();

const {
    getAllServices,
    createService,
    editService,
    deleteService
} = require('../controllers/service.controller');

router.get('/getAllServices', getAllServices);
router.post('/createService', createService);
router.put('/editService/:service_id', editService);
router.delete('/deleteService/:service_id', deleteService);

module.exports = router;
