
const getAllPermissions = (userRoles) => {
  // Extract all permissions from user roles
  let allPermissions = [];
  userRoles.forEach((role) => {
    allPermissions = allPermissions.concat(role.permissions);
  });

  // Get unique permissions
  const uniquePermissions = [...new Set(allPermissions)];

  // console.log(uniquePermissions);
  return uniquePermissions;
  // return {permissionIds:uniquePermissions, permissionObjects};
};

module.exports = getAllPermissions;
