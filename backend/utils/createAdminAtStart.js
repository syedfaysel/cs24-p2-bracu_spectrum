const User = require("../models/user.model");
const createRoleIfNone = require("./createRoleIfNone");


const adminAtStartup = async () => {
  // Check if there are any system admin users in the database
  try {
    const users = await User.find().populate({
      path: "role",
      match: { role_name: process.env.ADMIN_ROLE_NAME || "sys_admin" },
    });

    const filteredUsers = users.filter((user) => {
      return (
        (user.role && user.role.role_name === process.env.ADMIN_ROLE_NAME ||
          "sys_admin") 
      );
    });

    if (filteredUsers.length === 0) {
      // get the systemAdmin role object id if exists
      const role = await createRoleIfNone(
        process.env.ADMIN_ROLE_NAME || "sys_admin"
      );

      if (!!role) {
        await User.create({
          username: process.env.ADMIN_USERNAME || "admin",
          password: process.env.ADMIN_PASSWORD || "adminpassword",
          email: process.env.ADMIN_EMAIL || "admin@ecosync.com",
          role: role._id,
        }).then(() => {
          console.log("System admin user created");
        });
      }
    } else {
      console.log("System admin user already exists");
    }
  } catch (error) {
    console.error(
      "Error checking and/or creating system admin user:",
      error.message
    );
  }
};

module.exports = adminAtStartup;
