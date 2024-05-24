const db = require('../models');

const createUser = async (rfid, access) => {
    try {
        const user = await db.User.create({ rfid, access });

        return user;
    } catch (error) {
        throw new Error('Error al crear el usuario: ' + error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await db.User.findAll();
        return users;
    } catch (error) {
        throw new Error('Error al obtener los usuarios: ' + error.message);
    }
};

const getUserById = async userId => {
    try {
        const user = await db.User.findByPk(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user;
    } catch (error) {
        throw new Error('Error al obtener el usuario: ' + error.message);
    }
};

const updateUserById = async (userId, newData) => {
    try {
        const user = await db.User.findByPk(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await user.update(newData);
        return user;
    } catch (error) {
        throw new Error('Error al actualizar el usuario: ' + error.message);
    }
};

const deleteUser = async userId => {
    try {
        const user = await db.User.findByPk(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        await user.destroy();
        return user;
    } catch (error) {
        throw new Error('Error al borrar el usuario: ' + error.message);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser,
};
