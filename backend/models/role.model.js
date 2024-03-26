const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  title: {
    type: String,
    unique: true,
    default: "unassigned"
  }, 
  permissions: [{
    type: Schema.Types.ObjectId,
    ref: "Permission",
  }]

})


const Role = mongoose.model("Role", roleSchema);
module.exports = Role;