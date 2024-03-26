const User = require("../models/user.model");
const createRoleIfNone = require("./createRoleIfNone");

const adminAtStartup = async () => {
  // Check if there are any system admin users in the database
  try {
    // const adminUser = await User.findOne({ role: { title: "systemAdmin" } });
    const users = await User.find()
      .populate({
        path: "role",
        match: { name: "systemAdmin" },
      })
      .exec();
    // console.log("testing at line 9", users);
    // If no system admin user exists, create one
    if (users.length === 0) {
      // get the systemAdmin role object id if exists
      const role = await createRoleIfNone("systemAdmin");
      // console.log("testing at line 13", role);
      // If no system admin role exists, create one
      if (!!role) {
        await User.create({
          username: "admin",
          password: "adminpassword", // You should hash this password before storing it in production
          email: "admin@ecosync.com",
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
