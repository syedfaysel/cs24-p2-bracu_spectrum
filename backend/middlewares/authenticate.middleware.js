const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Middleware function to verify JWT token and populate req.user
// function authenticateToken(req, res, next) {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   console.log(token)
//   if (!token)
//     return res.status(200).json({ message: "Unauthorized: token missing" });

//   jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//     if (err) return res.status(200).json({ message: "Forbidden: Invalid token" });

//     const validUser = await User.findById(user.userId);
//     if (!validUser)
//       return res.status(400).json({ message: "Unauthorized: User must log in" });
//     req.user = user; // Attach decoded user information to req.user

//   });
//   next();
// }

const authenticateToken = (req, res, next) => {
  try {
    let token = req.cookies.token;
    
    // console.log(token);
    if (token) {
      // token = token.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } else
      res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
  } catch (error) {
    // next(error)
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};

module.exports = authenticateToken;
