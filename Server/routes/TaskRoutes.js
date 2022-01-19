const express = require('express');
const router = express.Router();

// importação dos arquivos de validação e controller
const TaskValidation = require('../middlewares/TaskValidations');
const MacAddressValidation = require('../middlewares/MacAddressValidation');
const TaskController = require('../controllers/TaskController');

// rotas
router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.get('/filter/all', MacAddressValidation,TaskController.all);

module.exports = router;