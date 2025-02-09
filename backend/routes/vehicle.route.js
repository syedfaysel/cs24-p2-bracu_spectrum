const router = require("express").Router();
const checkAccess = require("../middlewares/checkAccess.middleware");
const authMiddleware = require("../middlewares/authenticate.middleware");

const vehicle = require("../controllers/vehicle.controller");


router.post('/vehicle/add', vehicle.addVehicle);


module.exports = router;