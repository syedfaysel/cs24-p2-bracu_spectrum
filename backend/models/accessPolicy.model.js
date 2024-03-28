const mongoose = require("mongoose");

/*
Permissions == Access Policy (action or services) 
are the access policies that are assigned to roles
*/
const permissionSchema = new mongoose.Schema({
  // tenant_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  // user id of the person who did the entry of this policy
  resource_slug: { type: String, required: true, unique: true },
  policy_name: { type: String, required: true },
  category_name: {
    type: String,
    enum: ["User", "Role", "Permission", "Resource", "Specific", "All", "Other", "RBAC"],
    default: "Other",
  },
  created_at: { type: Date, default: Date.now },
});

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;
