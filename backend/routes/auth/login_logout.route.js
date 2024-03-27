const router = require("express").Router();
const auth = require("../../controllers/auth/login_logout.controller");


router.post("/login", auth.login);




module.exports = router;