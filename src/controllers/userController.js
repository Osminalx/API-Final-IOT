const userService = require('../services/usersService');

const createUser = async (req, res) => {
    const { rfid, access } = req.body;
    try {
        const user = await userService.createUser(rfid, access !== undefined ? access : false);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { access } = req.body;
    try {
        const updatedUser = await userService.updateUserById(userId, { access });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await userService.deleteUser(userId);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUsers,
    getAUser,
    updateUser,
    deleteUser,
};
