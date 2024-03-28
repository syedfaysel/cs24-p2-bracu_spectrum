const Role = require("../models/role.model");
const Permission = require("../models/permission.model");
const User = require("../models/user.model");


// add permission to db
const addPermission = async (req, res) => {
  try {
    const permission = new Permission(req.body);
    await permission.save();
    res.status(201).send(permission);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Permission.",
    });
  }
};
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).send(permissions);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving permissions.",
    });
  }
}

// delete permission
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).send({
        message: `Cannot delete Permission with id=${req.params.id}. Maybe Permission was not found!`,
      });
    }
    res.status(200).send({ message: "Permission was deleted successfully!" });
  
  } catch (error) {
    res.status(500).send({
      message: error.message || "Could not delete Permission with id=" + req.params.id,
    });
  }
}


// Create and Save a new Role
const createRole = async (req, res) => {
  try {
    console.log(req.body);
    const role = await Role.create({
      title: req.body.title,
    })
    res.status(201).send(role);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Role.",
    });
  }
};

// get all roles
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions');
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving roles.",
    });
  }
}

// assign permission to rule

const assignPermissionToRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.roleId);
    if (!role) {
      return res.status(404).send({
        message: `Role not found with id ${req.params.roleId}`,
      });
    }
    // check if permission exists
    const label = req.body.label; // permission label
    const permission = await Permission.findOne({label: label});
    if (!permission) {
      return res.status(404).send({
        message: `Permission not found with id ${label}`,
      });
    }
    role.permissions.push(permission._id);
    await role.save();
    const data = await role.populate('permissions');
    res.status(200).send(role);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while assigning permission to role.",
    });
  }

}

module.exports = {
  addPermission,
  getPermissions,
  deletePermission,
  assignPermissionToRole,
  createRole,
  getRoles,
}