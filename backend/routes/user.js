const express = require("express");
const protect = require('../middlewares/authMiddleware');
const router = express.Router();
const {
    getUser,
} = require("../controllers/userController");


// @route   GET api/auth/user
// @desc    Get current user
// @access  Private
router.get("/", protect, getUser);

module.exports = router;
