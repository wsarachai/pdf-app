const User = require('../models/User');

exports.create = async (userData) => {
  // Logic to register a new user in the database
  return await User.create(userData);
}

exports.findById = async (id) => {
  // Logic to find a user by ID in the database
  return await User.findById(id);
};

exports.findByEmail = async (email) => {
  // Logic to find a user by email in the database
  return await User.findByEmail(email);
};

exports.findAll = async () => {
  // Logic to retrieve all users from the database
  return await User.findAll();
};

exports.delete = async (id) => {
  // Logic to delete a user by ID from the database
  return await User.delete(id);
};