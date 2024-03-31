const User = require("../models/user.model");
const Role = require("../models/accessRole.model");
const createRoleIfNone = require("../utils/createRoleIfNone");
const createPermissionIfNone = require("../utils/createPermissionIfNone");
const getAllPermissions = require("../utils/getAllPermissions");

// create a new user // ok (system admin access)
const createUser = async (req, res, next) => {
  try {
    let { username, email, password, roles } = req.body;
    if (!username || !email || !password) {
      next({success: false, message: "Please provide username, email and password" });
    }
    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      return res.send({
        success: false,
        message: `User already exists with ${
          userExists.username === username ? username : email
        }`,
      });
    }
    let query = { username, email, password };

    // Convert roleId to an array if it's a single value
    if (roles) {
      if (!Array.isArray(roles)) {
        roles = [roles];
      }

      // Check if the roles exist in the database
      const existingRoles = await Role.find({ _id: { $in: roles } });

      if (existingRoles.length !== roles.length) {
        return res.status(404).json({ message: "Role(s) not found." });
      }

      // Filter out existing roles from the list of new roles
      const newRoleIds = roles.filter(
        (newRoleId) => !user.roles.includes(newRoleId)
      );
      // set roles
      query.roles = newRoleIds;
    } else {
      // if no role is assigned, assign unassigned role
      const unassigned_role = await Role.findOne({ role_name: "unassigned" });
      if (!unassigned_role) {
        const role = await Role.create({
          role_name: "unassigned",
          role_rank: 0,
          role_description: "Unassigned",
        });
        query.roles = [role._id];
      }
      query.roles = [unassigned_role._id];
    }

    const user = (await User.create(query)).populate({
      path: "roles",
      populate: {
        path: "permissions",
      },
    });
    user.password = undefined;
    return res.status(201).send({
      success: true,
      message: "User created successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

//get all users // ok (system admin access)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate({
        path: "roles",
        select: ["role_name", "role_description", "_id"],
        populate: {
          path: "permissions",
          select: ["policy_name", "resource_slug", "_id"],
        },
      });
    res.status(200).send({ success: true, users});
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

// get user by id // ok
const getUserById = async (req, res, next) => {
  try {
    const _id = req.params.userId;
    const user = await User.findById(_id).select("-password").populate({
      path: "roles",
    });
    if (!user) {
      next({ message: `User not found with id ${_id}` });
    }
    res.status(200).send(user);
  } catch (error) {
    next(error.message || "Some error occurred while getting the User.");
  }
};

// get all roles // ok
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).send({success: true, roles});
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving roles.",
    });
  }
};

// Update user // can be modified (system admin access or own)
const updateUser = async (req, res) => {
  try {
    const _id = req.params.userId;

    const user = await User.findByIdAndUpdate(_id, req.body);

    if (!!user) {
      res.status(200).send({success: true, message: "User updated successfully!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the User.",
    });
  }
};

// Delete user //  ok (system admin access)
const deleteUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      res.status(404).send({
        success: false,
        message: `User not found with id ${_id}`,
      });
    }
    res.status(200).send({success: true,  message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the User.",
    });
  }
};

// assgin role to user // ok *** (system admin access)
const updateUserRoles = async (req, res) => {
  try {
    // Extract user ID and updated roles from request parameters and body
    const { userId } = req.params;
    let { roles } = req.body;

    // Validate request data
    if (!userId || !roles) {
      return res
        .status(400)
        .json({ message: "Please provide user ID and role ID(s)." });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Convert roleId to an array if it's a single value
    if (!Array.isArray(roles)) {
      roles = [roles];
    }

    // Check if the roles exist in the database
    const existingRoles = await Role.find({ _id: { $in: roles } });

    if (existingRoles.length !== roles.length) {
      return res.status(404).json({ message: "Role(s) not found." });
    }

    // Filter out existing roles from the list of new roles
    const newRoleIds = roles.filter(
      (newRoleId) => !user.roles.includes(newRoleId)
    );

    // Add the new roles to the user's roles array
    user.roles.push(...newRoleIds);

    // Save the updated user to the database
    await user.save();

    res.status(200).json({ message: "User roles updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user roles", error: error.message });
  }
};

// extra function to get user permissions // ok
const getPermissions = async (req, res) => {
  // console.log("endpoint hits");
  const user = req.user;
  try {
    resUser = await User.findById(user.userId).populate({
      path: "roles",
      populate: {
        path: "permissions",
        select: ["policy_name", "resource_slug"],
      },
    });
    const allowedPermissions = getAllPermissions(resUser.roles) || [];
    return res.status(200).send(allowedPermissions);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving permissions.",
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  getAllRoles,
  updateUser,
  deleteUser,
  updateUserRoles,
  getPermissions,
};
