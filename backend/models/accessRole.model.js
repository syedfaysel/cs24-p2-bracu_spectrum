const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role_name: { type: String, unique: true, required: true },
  role_rank: { type: Number, default: 0 },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }], // Array of allowed resource slugs
  role_description: { type: String },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
