const router = require("express").Router();
const checkAccess = require("../middlewares/checkAccess.middleware");
const authMiddleware = require("../middlewares/authenticate.middleware");
const sts = require("../controllers/sts.controller");


router.post('/sts/create',  sts.createSTS);
router.put('/sts/assign-managers', sts.assignManagers);
router.put('/sts/assign-trucks', sts.assignTrucks);


module.exports = router;