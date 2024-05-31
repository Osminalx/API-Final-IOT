const express = require('express');
const doorStatusController = require('../controllers/doorStatusController');
const router = express.Router();

router.get('/status', doorStatusController.getDoorStatus);
router.put('/status', doorStatusController.updateDoorStatus);

module.exports = router;
