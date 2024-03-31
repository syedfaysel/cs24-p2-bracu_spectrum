const User = require("../models/user.model");
const Role = require("../models/accessRole.model");
const createRoleIfNone = require("../utils/createRoleIfNone");
const createPermissionIfNone = require("../utils/createPermissionIfNone");

// create a new user // ok (system admin access)
const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role_id } = req.body;
    if (!username || !email || !password) {
      next({ message: "Please provide username, email and password" });
    }
    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      next({
        message: `User already exists with ${
          userExists.username === username ? username : email
        }`,
      });
    }
    const query = { username, email, password };
    if (!role_id) {
      const uassigned_id = await Role.findOne({ role_name: "unassigned" });
      if (!uassigned_id) {
        const role = await Role.create({
          role_name: "unassigned",
          role_rank: 0,
          role_description: "Unassigned",
        });
        query.role = [role._id];
      }
    } else {
      const role = await Role.findById(role_id);
      if (!!role) {
        query.role = [role._id];
      } else {
        return res.status(400).send({message:`Duplicated ${role_id} `})
      }      
    }
    const user = await User.create({ username, email, password });
    user.password = undefined;
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

//get all users (system admin access)
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate({
        path: "role",
        select: ["role_name","role_description"],
        populate: {
          path: "permissions",
          select: ["policy_name","resource_slug","_id"],
        },
      });
    res.status(201).send(users);
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
      path: "role",
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
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving roles.",
    });
  }
};

// Update user // ok (system admin access or own)
const updateUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await User.findByIdAndUpdate(_id, req.body);
    if (!!user) {
      res.status(200).send({ message: "User updated successfully!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the User.",
    });
  }
};

// Delete user // ok (system admin access)
const deleteUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      res.status(404).send({
        message: `User not found with id ${_id}`,
      });
    }
    res.status(200).send({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the User.",
    });
  }
};

// assgin role to user // ok (system admin access)
const updateUserRole = async (req, res) => {
  try {
    const _id = req.params.userId;
    const role = req.body.roleId;

    const user = await User.findByIdAndUpdate(req.params.userId);
    if (!user) {
      res.status(404).send({
        message: `User not found with id ${_id}`,
      });
    } else {
      user.role = role;
      const resUser = await user.save();
      resUser.populate('role')
      res
        .status(200)
        .send({ message: "User role updated successfully!", user: resUser });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating the User role",
    });
  }
};



const getPermissions = async (req, res) => {
  console.log('endpoint hits')
  const user = req.user;
  try {
      resUser = await User.findById(user.userId).populate({
      path: "role",
      populate: {
        path: "permissions",
        select: ["policy_name", "resource_slug"]
      }
    });
    console.log(resUser.role.permissions)
    return res.status(200).send(resUser.role.permissions);

  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving permissions.",
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
  updateUserRole,
  getPermissions,
};
