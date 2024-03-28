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
      return res
        .status(401)
        .json({ error: "Unauthorized: User not logged in" });

    const user = await User.findById(req.user.userId).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    let permissions_allowed_list = user.role?.permissions;
    permissions_allowed_list = permissions_allowed_list.map((permission) =>
      permission._id.toString()
    );
    // console.log(permissions_allowed_list);

    const permissionObj = await Permission.findOne({
      resource_slug: resource_slug,
    });

    // const permissionDecoded = permissionObj._id.toString();
    // console.log(permissionDecoded);
    if (
      !!permissionObj &&
      permissions_allowed_list?.includes(permissionObj._id.toString())
    ) {
      console.log(
        `User ${user.email} has permission to access ${resource_slug}`
      );
      next();
    } else {
      console.log(
        `User "${user.username}" doesn't have access to "${resource_slug}"`
      );
      res.status(403).send({
        error: "Permission denied",
        message: `User '${user.username}' doesn't have access to '${resource_slug}'`,
      });
    }
  };
};

module.exports = checkAccess;
