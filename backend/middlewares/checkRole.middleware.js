const authenticateToken = require("./authenticate.middleware");

// Define a higher-order function that returns the middleware function
const User = require("../models/user.model");

const checkRole = (role = []) => {

  // Return the middleware function
  if (typeof role === "string") role = [role];
  return async (req, res, next) => {

    // console.log("request header in checkRole", req.headers)
    // Check if user has the specified role
    if(!req.user) return res.status(401).json({ error: "Unauthorized: No token provided" });
    const user = await User.findById(req.user.userId).populate("role");
    if (user && role.includes(user.role.title)) {
      // User has the specified role, allow access
      next();
    } else {
      // User does not have the specified role, send forbidden response
      res.status(403).json({ error: "Forbidden: Insufficient permissions" });
    }
  };
};


module.exports = checkRole;
