const express = require("express");
const router = express.Router();
const {
    register,
    login,
    refreshToken
} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const { check } = require("express-validator");

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  "/register",
  [
    check("id", "User ID is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 8 or more characters"
    ).isLength({ min: 8 }),
  ],
  register
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/login",
  [
    check("id", "User ID is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  login
);

// @route   POST api/auth/refresh
// @desc    Refresh authentication token
// @access  Private
router.post("/refresh", protect, refreshToken);

module.exports = router;