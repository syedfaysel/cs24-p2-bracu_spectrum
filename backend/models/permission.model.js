const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    label: { type: String, required: true, unique: true },
    description: { type: String }
    // Add any other relevant fields for the permission
});

module.exports = mongoose.model('Permission', permissionSchema);
