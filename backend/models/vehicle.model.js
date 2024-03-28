const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  regNum: { type: String, required: true, unique: true },
  type: {
    type: String,
    enum: ["Open Truck", "Dump Truck", "Compactor", "Container Carrier"],
    required: true,
  },
  capacity: {
    type: Number,
    enum: [3, 5, 7],
    required: true,
  },
  fuelCostPerKmLoaded: { type: Number, required: true },
  fuelCostPerKmUnloaded: { type: Number, required: true },
  sts: { type: Schema.Types.ObjectId, ref: "STS", unique: true }, // Reference to the STS it belongs to
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
