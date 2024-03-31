const router = require("express").Router();
const auth = require("../../controllers/auth/login_logout.controller");
const authenticateToken = require("../../middlewares/authenticate.middleware")


router.post("/login", auth.login);
router.get("/logout", authenticateToken, auth.logout);




module.exports = router;