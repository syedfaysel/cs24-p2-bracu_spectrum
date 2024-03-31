const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware function to verify JWT token and populate req.user
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(400).json({ error: "Unauthorized: token missing" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.status(400).json({ error: "Forbidden: Invalid token" });

    const validUser = await User.findById(user.userId);
    if (!validUser)
      return res.status(400).json({ error: "Unauthorized: User must log in" });
    req.user = user; // Attach decoded user information to req.user
    next();
  });
}

module.exports = authenticateToken;
