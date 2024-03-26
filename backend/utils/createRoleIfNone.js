const Role = require("../models/role.schema");
const path = require("path");

async function createRoleIfNone(roleName) {
  try {
    const role = await Role.findOne({ title: roleName });
    if (!!role) {
      console.log(`at ${path.basename(__filename)} -> Role : ${roleName} exists`);
      return role; // returns role if role exists, create new otherwise
    } else {
      const newRole = await Role.create({
        title: roleName,
      });
      console.log(`at ${path.basename(__filename)} -> Role ${roleName} created`);
      return newRole;
    }
  } catch (error) {
    console.error(`Error checking and/or creating Role : ${roleName}`, error.message);
    // return false; // Return false in case of error
  }
}

module.exports = createRoleIfNone;
