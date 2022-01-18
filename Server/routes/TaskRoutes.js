const express = require('express');
const router = express.Router();

// importação dos arquivos de validação e controller
const TaskValidation = require('../middlewares/TaskValidations');
const TaskController = require('../controllers/TaskController');

// rotas
router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);

module.exports = router;