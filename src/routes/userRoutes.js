const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/newuser', userController.createUser);

router.get('/',userController.getUsers);

router.get('/:userId',userController.getAUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId',userController.deleteUser);

module.exports = router;
