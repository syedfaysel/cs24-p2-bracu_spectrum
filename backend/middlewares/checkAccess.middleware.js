const authenticateToken = require("./authenticate.middleware");

// Define a higher-order function that returns the middleware function
const User = require("../models/user.model");
const Permission = require("../models/accessPolicy.model");

const checkAccess = (resource_slug) => {
  /* resource_slug is the resource to be protected 
  resource_slug = permission.resource_slug
  i.e user.create, permission.create
  */
  return async (req, res, next) => {
    // check if logged in
    if (!req.user)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    const user = await User.findById(req.user.userId).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    const permissions_allowed_list = user.role.permissions;
    const permission = await Permission.find({ resource_slug });
    if (!!permission && permissions_allowed_list?.includes(permission._id)) {
      next();
    } else {
      res.status(403).send({ error: "Forbidden: Insufficient permissions" });
    }
  };
};

module.exports = checkAccess;
