const router = require('express').Router();

const {
    getAllBarbershops,
    getOneBarbershop,
    createOneBarbershop,
    editOneBarbershop,
    deleteOneBarbershop
} = require('../controllers/barbershop.controller')


router.get('/getAll', getAllBarbershops  )
router.get('getOne/:barbershop_id', getOneBarbershop)
router.post('/create', createOneBarbershop)
router.put('/edit/:barbershop_id', editOneBarbershop)
router.delete('/delete/:barbershop_id', deleteOneBarbershop)

module.exports = router;


