const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userService.findByEmail(email);
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = {
      email,
      password,
    };

    // Hash the user's password before saving
    user.password = await bcrypt.hash(user.password, 10);

    userService.create(user);

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        const safeUser = {
          id: user.id,
          email: user.email,
        };
        res.json({ token, user: safeUser });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userService.findByEmail(email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        const safeUser = {
          id: user.id,
          email: user.email,
        };
        res.json({ token, user: safeUser });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.refreshToken = async (req, res) => {
  // The token is validated by the auth middleware and user is attached to req
  const userId = req.user.id;

  try {
    const user = await userService.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Create a new token with a new expiration time
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" }, // New expiration
      (err, token) => {
        if (err) {
          console.error("Error signing new token:", err);
          return res.status(500).send("Server error during token refresh");
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Token refresh error:", err.message);
    res.status(500).send("Server error");
  }
};