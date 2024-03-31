const router = require("express").Router();
const checkAccess = require("../middlewares/checkAccess.middleware");
const authMiddleware = require("../middlewares/authenticate.middleware");


//import users controller
const users = require("../controllers/users.controller");

router.post("/users", authMiddleware, checkAccess("user.create"), users.createUser);
router.get("/users", authMiddleware, checkAccess("user.all.get"), users.getUsers);
router.get('/user/permissions', authMiddleware, users.getPermissions);
router.get("/users/roles", users.getAllRoles);
router.get("/users/:userId", users.getUserById);
router.put('/users/:userId/roles', authMiddleware, checkAccess("user.role.update"), users.updateUserRole);
router.put("/users/:userId", authMiddleware, checkAccess("user.update"), users.updateUser);
router.delete("/users/:userId", authMiddleware, checkAccess("user.delete"), users.deleteUser);



module.exports = router;
