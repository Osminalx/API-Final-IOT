const express = require('express');
const emergencyController = require('../controllers/emergencyController');
const router = express.Router();

router.post('/emergencies', emergencyController.createEmer);
router.get('/emergencies', emergencyController.getEmergencies);
router.get('/emergencies/:emerId', emergencyController.getEmergency);
router.delete('/emergencies/:emerId', emergencyController.deleteEmergency);

module.exports = router;
