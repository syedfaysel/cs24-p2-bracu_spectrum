
const STS = require("../models/sts.model");
const User = require("../models/user.model");
const Vehicle = require("../models/vehicle.model");


const createSTS = async (req, res, next) => {
  try {
    const {
      wardNumber,
      capacity,
      longitude,
      latitude,
    } = req.body;

    if(!wardNumber || !capacity || !longitude || !latitude){
      return res.status(400).json({message: "Please provide all the required fields"})
    }
    
    const exist = await STS.findOne({ wardNumber });
    if (!!exist) {
      return res.status(400).json({ success: false, message: "STS already exist" });
    }
    
    const sts = await STS.create({
      wardNumber,
      capacity,
      longitude,
      latitude,
    });
    return res.status(201).json({ success: true, sts });

  } catch (error) {
    return next(error);
  }
};

const assignManagers = async (req, res, next) => {
  try {
    const { stsId, users } = req.body;

    if (!stsId || !users ) {
      return res.status(400).json({ message: "Please provide all the required fields" });
    }
    const sts = await STS.findById(stsId);
    if (!sts) {
      return res.status(404).json({ message: "STS not found" });
    }
    const managers = await User.find().populate({
      path: "roles",
      match: { role_name: "sts_manager" }
    });

    const filtered = managers.filter(manager => {
      return users.includes(manager._id);
    })

    console.log(filtered);
    if (filtered.length !== users.length) {
      return res.status(400).json({ message: "Some user(s) are not sts_manager" });
    }

    const ids = filtered.map(manager => manager._id);

    const unique = [...new Set([...sts.managers, ...ids])];

    sts.managers = unique;
    const result = await sts.save();
    if(result){
      return res.status(200).json({ success: true, message: "Manager(s) assigned successfully" });
    }
    
  } catch (error) {
    return next(error);
  }
}


const assignTrucks = async (req, res, next) => {
  try {
    let { stsId, regNums } = req.body;
    
    if (!stsId || !regNums) {
      return res.status(400).json({ message: "Please provide all the required fields" });
    }
    if (typeof regNums === 'string') {
      regNums = [regNums];
    }

    const sts = await STS.findById(stsId);
    if (!sts) {
      return res.status(404).json({ message: "STS not found" });
    }
    const trucks = await Vehicle.find({ regNum: { $in: regNums }, assigned:false });
    if (trucks.length !== regNums.length) {
      return res.status(400).json({ message: "Some truck(s) not found or assigned to another STS" });
    }

    const ids = trucks.map(truck => truck._id);
    // no need to check unique since, truck is assigned to only one sts
    await Vehicle.updateMany({ regNum: { $in: regNums } }, { assigned: true, sts: stsId });
    sts.trucks.push(...ids);
    await sts.save();

    return res.status(200).json({ success: true, message: "Truck(s) assigned successfully" });
    
    
  } catch (error) {
    return res.statu(500).json({ message: error.message });
  }
}


module.exports = {
  createSTS,
  assignManagers,
  assignTrucks,
}