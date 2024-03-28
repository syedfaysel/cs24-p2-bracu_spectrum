const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token and populate req.user
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Unauthorized: token missing" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden: Invalid token" });

    // console.log(user)
    req.user = user; // Attach decoded user information to req.user
    next();
  });
}

module.exports = authenticateToken;
