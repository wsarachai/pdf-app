const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  // Check for token in x-auth-token header or Authorization header with Bearer scheme
  let authHeader = req.header("x-auth-token");

  // Check Authorization header if token not in x-auth-token
  if (!authHeader && req.header("Authorization")) {
    // Format: "Bearer <token>"
    authHeader = req.header("Authorization");
  }

  // Check if not token
  if (!authHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Format: "Bearer <token>"
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7);
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
