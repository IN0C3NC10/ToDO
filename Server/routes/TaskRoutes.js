const express = require('express');
const router = express.Router();

// importação dos arquivos de validação e controller
const TaskValidation = require('../middlewares/TaskValidations');
const TaskController = require('../controllers/TaskController');

//=========== ROTAS ===========//
router.post('/', TaskValidation, TaskController.create);
router.get('/:id', TaskController.show);
router.put('/:id', TaskValidation, TaskController.update);
router.put('/:id/:done', TaskController.done);
router.delete('/:id', TaskController.delete);

router.get('/filter/all/:macaddress', TaskController.all);
router.get('/:filter/late/:macaddress', TaskController.late);
router.get('/:filter/today/:macaddress', TaskController.today);
router.get('/:filter/week/:macaddress', TaskController.week);
router.get('/:filter/month/:macaddress', TaskController.month);
router.get('/:filter/year/:macaddress', TaskController.year);

module.exports = router;