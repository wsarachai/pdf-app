const {
    createUser,
    getUserById,
    getUserByEmail,
    getAllUsers,
    deleteUser,
} = require('../dao/userDao');

exports.create = async (userData) => {
  return createUser(userData);
};

exports.findById = async (id) => {
  return getUserByid(id);
};

exports.findByEmail = async (email) => {
  return getUserByEmail(email);
};

exports.findAll = async () => {
  return getAllUsers();
};

exports.delete = async (id) => {
  return deleteUser(id);
};