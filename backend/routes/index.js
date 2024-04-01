const router = require("express").Router();
const checkAcccess = require("../middlewares/checkAccess.middleware");
const rbac = require("./rbac.route");
const auth = require("./auth/login_logout.route");
const users = require("./users.route");
const checkAccess = require("../middlewares/checkAccess.middleware");
const authMiddleware = require("../middlewares/authenticate.middleware");
const vehicle = require("./vehicle.route");
const sts = require("./sts.route");

router.use("/rbac", authMiddleware, checkAcccess('rbac.all'), rbac);
router.use("/auth", auth);
router.use("/", users);
router.use('/', authMiddleware, checkAccess('vehicle.manage'), vehicle);
router.use('/sts', sts);

module.exports = router;
