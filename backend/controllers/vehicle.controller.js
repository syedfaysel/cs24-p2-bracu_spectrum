const Vehicle = require("../models/vehicle.model");


const addVehicle = async (req, res, next) => {
  try {
    const {
      regNum,
      type,
      fuelCostPerKmLoaded,
      fuelCostPerKmUnloaded,
    } = req.body;
    const vehicleTypes = {
      "Open Truck": 3,
      "Dump Truck": 5,
      "Compactor": 7,
      "Container Carrier": 15,
    };

    if (
      !regNum ||
      !type ||
      !fuelCostPerKmLoaded ||
      !fuelCostPerKmUnloaded 
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(!vehicleTypes[type]){
      return res.status(400).json({ message: "Invalid vehicle type", vehicleTypes});
    }

    // check if exists 
    const vehicle = await Vehicle.findOne({ regNum });
    if (!!vehicle) {
      return res.status(400).json({ message: `Vehicle already exists with regNum:${regNum}` });
    } else {
      query = {
        regNum,
        type,
        capacity: vehicleTypes[type],
        fuelCostPerKmLoaded,
        fuelCostPerKmUnloaded,
      }

      const newVehicle = await Vehicle.create(query);
      return res.status(201).json({success: true, message: "Vehicle added successfully", vehicle: newVehicle });

    }
    
  } catch (error) {
    return next(error);
  }
};




module.exports = {
  addVehicle,
}