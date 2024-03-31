const router = require('express').Router();
const passport = require('passport');
const { isAdminMiddleware } = require('../middleware/auth.middleware');

const {
    getAllServices,
    createService,
    editService,
    deleteService
} = require('../controllers/service.controller');


router.get('/getAllServices', getAllServices);

const jwtPassport = [passport.authenticate('jwt', { session: false }), isAdminMiddleware]
router.post('/createService', jwtPassport, createService);
router.put('/editService/:service_id', jwtPassport, editService);
router.delete('/deleteService/:service_id', jwtPassport, deleteService);

module.exports = router;
