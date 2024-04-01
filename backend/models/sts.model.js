const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stsSchema = new Schema({
  wardNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  managers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  trucks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  ],
});

module.exports = mongoose.model("STS", stsSchema);
