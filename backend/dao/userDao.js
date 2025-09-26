const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DB_FILE = path.join(__dirname, '_data', 'userDb.json');

// Load database from file
let users = new Map();
if (fs.existsSync(DB_FILE)) {
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  users = new Map(JSON.parse(data));
} else {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify([]), 'utf-8');
}

// Save database to file
const saveDatabase = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(Array.from(users.entries())), 'utf-8');
};

// User DAO methods
const createUser = (userData) => {
  const id = uuidv4();
  users.set(id, userData);
  saveDatabase();
  return id;
};

const getUserById = (id) => {
  return users.get(id);
};

const getUserByEmail = (email) => {
  for (const [_, user] of users.entries()) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

const getAllUsers = () => {
  return Array.from(users.values());
};

const deleteUser = (id) => {
  const result = users.delete(id);
  saveDatabase();
  return result;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllUsers,
  deleteUser,
};