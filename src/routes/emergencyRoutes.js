const express = require('express');
const emergencyController = require('../controllers/emergencyController');
const router = express.Router();

router.post('/', emergencyController.createEmer);
router.get('/', emergencyController.getEmergencies);
router.get('/:emerId', emergencyController.getEmergency);
router.delete('/:emerId', emergencyController.deleteEmergency);

module.exports = router;
