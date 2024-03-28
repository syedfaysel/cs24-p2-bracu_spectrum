const Permission = require("../models/accessPolicy.model")

const createPermissionIfNone = async ({resource_slug, policy_name, category_name}) => {

  try{
    const permission = await Permission.findOne({ resource_slug });
    if (!!permission) {
      console.log(`Permission : ${resource_slug} exists`);
      return permission._id; // returns permission if permission exists, create new otherwise
    } else {
      const newPermission = await Permission.create({
        resource_slug,
        policy_name,
        category_name,
      });
      console.log(`Permission ${resource_slug} created`);
      return newPermission._id;
    }
  } catch (error) {
    console.error(`Error checking and/or creating Permission : ${resource_slug}`, error.message);
    return false;
  }
}

module.exports = createPermissionIfNone;