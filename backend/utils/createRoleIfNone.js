const Role = require("../models/accessRole.model");
const createPermissionIfNone = require("./createPermissionIfNone");
const path = require("path");

async function createRoleIfNone(roleName) {
  try {
    const role = await Role.findOne({ role_name: roleName });
    if (!!role) {
      console.log(`at ${path.basename(__filename)} -> Role : ${roleName} exists`);
      return role; // returns role if role exists, create new otherwise
    } else {
      /* 
      before creating a new role, 
      create a new permission or (access policy) `permission.create` 
      for `sys_admin` role
      */
      const policy_id = await createPermissionIfNone({
        resource_slug: "rbac.all",
        policy_name: "RBAC All Access",
        category_name: "Permission",
      });
      if (!!policy_id) {
        const newRole = await Role.create({
          role_name: roleName,
          role_rank: 1,
          role_description: "System Admin",
          permissions: [policy_id],
        });
        console.log(`at ${path.basename(__filename)} -> Role ${roleName} created`);
        return newRole;
      }
      
      
    }
  } catch (error) {
    console.error(`Error checking and/or creating Role : ${roleName}`, error.message);
    // return false; // Return false in case of error
  }
}


module.exports = createRoleIfNone;
