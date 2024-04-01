const addVehicle = async (req, res, next) => {
  try {
    const {
      regNum,
      type,
      capacity,
      fuelCostPerKmLoaded,
      fuelCostPerKmUnloaded,
      sts,
    } = req.body;
    if (
      !regNum ||
      !type ||
      !capacity ||
      !fuelCostPerKmLoaded ||
      !fuelCostPerKmUnloaded ||
      !sts
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
  } catch (error) {
    return next(error);
  }
};
