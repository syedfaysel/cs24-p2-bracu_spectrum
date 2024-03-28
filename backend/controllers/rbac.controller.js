const Role = require("../models/accessRole.model");
const Permission = require("../models/accessPolicy.model");


// create new access policy (permission) // ok
const createPermission = async (req, res) => {
  try {
    const { policy_name, resource_slug, category_name } = req.body;

    if (!resource_slug || !policy_name) {
      return res.status(400).send({
        message: "Resource slug and policy name cannot be empty",
      });
    }
    const query = { resource_slug, policy_name };
    if(category_name) query.category_name = category_name;
    const permission = await Permission.create(query);
    res.status(201).send(permission);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Permission.",
    });
  }
};

// retrieve all access poilicies (permissions) // ok
const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).send(permissions);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving permissions.",
    });
  }
};

// delete permission // ok
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.body.policy_id);
    if (!permission) {
      return res.status(404).send({
        message: `Cannot delete Permission with id=${req.body.policy_id}. Maybe Permission was not found!`,
      });
    }
    res.status(200).send({
      message: `${req.body.policy_id} Permission was deleted successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        `Could not delete Permission with id ${req.body.policy_id}`,
    });
  }
};

// Access Role (Role) controller // ok
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate("permissions");
    res.status(200).send(roles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving roles.",
    });
  }
};

// Create Role // ok
const createRole = async (req, res) => {
  try {
    const { role_name, role_rank, role_description, permissions } = req.body;
    // Validate request
    const query = {};

    if (role_name) {
      query.role_name = role_name;
    } else {
      return res.status(400).send({
        message: "Role name cannot be empty",
      });
    }

    const role = await Role.findOne({ role_name: role_name });

    if (!!role) {
      return res.status(400).send({
        message: `Role with name ${role_name} already exists`,
      });
    }

    if (role_rank) query.role_rank = role_rank;
    if (role_description) query.role_description = role_description;

    if (permissions?.length > 0) {
      const allPermissions = await Permission.find();
      const filteredPermissions = allPermissions.filter((permission) => {
        return permissions.includes(permission._id);
      });
      query.permissions = filteredPermissions;
    }

    const newRole = await Role.create(query);
    res.status(201).send(newRole);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the Role.",
    });
  }
};

// Delete Role // ok
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.body.roleId);
    if (!role) {
      return res.status(404).send({
        message: `Cannot delete Role with id=${req.body.roleId}. Maybe Role was not found!`,
      });
    }
    res.status(200).send({
      message: `${req.body.roleId}Role was deleted successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || `Could not delete Role with id ${req.body.roleId}`,
    });
  }
};

// Assign/Remove permission to/from role // ok
const assignPermissionToRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.roleId);
    if (!role) {
      return res.status(404).send({
        message: `Role not found with id ${req.params.roleId}`,
      });
    }

    // Check if permission IDs are provided in the request body
    if (!req.body.permissions || !Array.isArray(req.body.permissions)) {
      return res.status(400).send({
        message: "Invalid permissions provided",
      });
    }

    // Retrieve permissions based on the provided IDs
    const permissionIds = req.body.permissions;
    const permissions = await Permission.find({ _id: { $in: permissionIds } });
    if (!permissions.length) {
      return res.status(404).send({
        message: `No permissions found to assign to role ${req.params.roleId}`,
      });
    }

    // Determine the operation type (add or remove)
    const operationType = req.body.operationType || "add"; // Default to "add" if not specified

    // Update role permissions based on the operation type
    if (operationType === "add") {
      // Find permissions that are not already assigned to the role
      const newPermissions = permissions.filter(
        (permission) => !role.permissions.includes(permission._id)
      );
      // Assign new permissions to the role
      role.permissions.push(
        ...newPermissions.map((permission) => permission._id)
      );
    } else if (operationType === "remove") {
      // Remove permissions that are currently assigned to the role
      role.permissions = role.permissions.filter(
        (permission) => !permissionIds.includes(permission.toString())
      );
    }

    // Save the updated role
    await role.save();

    res.status(200).send({
      message: `Permissions ${
        operationType === "add" ? "assigned to" : "removed from"
      } role successfully`,
      data: role,
    });
  } catch (error) {
    console.error("Error assigning/removing permission to/from role:", error);
    res.status(500).send({
      message:
        "Some error occurred while assigning/removing permission to/from role.",
    });
  }
};

module.exports = {
  createPermission,
  getPermissions,
  deletePermission,
  assignPermissionToRole,
  createRole,
  deleteRole,
  getRoles,
};
