const express = require('express');
const router = express.Router();

// importação dos arquivos de validação e controller
const TaskValidation = require('../middlewares/TaskValidations');
const MacAddressValidation = require('../middlewares/MacAddressValidation');
const TaskController = require('../controllers/TaskController');

//=========== ROTAS ===========//
router.post('/', TaskValidation, TaskController.create);
router.get('/:id', TaskController.show);
router.put('/:id', TaskValidation, TaskController.update);
router.put('/:id/:done', TaskController.done);
router.delete('/:id', TaskController.delete);

router.get('/filter/all', MacAddressValidation,TaskController.all);
router.get('/:filter/late', MacAddressValidation,TaskController.late);
router.get('/:filter/today', MacAddressValidation,TaskController.today);

module.exports = router;