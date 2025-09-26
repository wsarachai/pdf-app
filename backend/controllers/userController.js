const userService = require("../services/userService");

exports.getUser = async (req, res) => {
  try {
    // req.user is set from the auth middleware
    const user = await userService.findByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const safeUser = {
      id: user.id,
      email: user.email,
    };

    res.json({ user: safeUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};