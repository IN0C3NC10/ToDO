const express = require('express');
const router = express.Router();

// importação dos arquivos de validação e controller
const TaskValidation = require('../middlewares/TaskValidations');
const TaskController = require('../controllers/TaskController');

router.post('/', TaskValidation, TaskController.create);

module.exports = router;