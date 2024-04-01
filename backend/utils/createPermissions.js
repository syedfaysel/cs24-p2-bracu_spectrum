const Permission = require('../models/accessPolicy.model')


const permissions = [{
  "resource_slug": "user.create",
  "policy_name": "Create User",
  "category_name": "User"
},{
  "resource_slug": "rbac.all",
  "policy_name": "RBAC All Access",
  "category_name": "Permission"
},{
  "resource_slug": "user.all.get",
  "policy_name": "Get User List",
  "category_name": "RBAC"
},{
  "resource_slug": "user.update",
  "policy_name": "Update User",
  "category_name": "User"
},{
  "resource_slug": "user.delete",
  "policy_name": "Delete User",
  "category_name": "User"
},{
  "resource_slug": "user.role.update",
  "policy_name": "Update User role",
  "category_name": "User"
},{
  "resource_slug": "vehicle.manage",
  "policy_name": "Manage Vehicle",
  "category_name": "Permission"
}]





const createAllPermissions = async (req, res) => {
  try {
    await Permission.insertMany(permissions);
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = createAllPermissions