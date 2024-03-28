const router = require("express").Router();
const rbac = require("../controllers/rbac.controller.js");

// parent path : /rbac
router.get("/permissions", rbac.getPermissions);
router.post("/permissions", rbac.createPermission);
router.delete("/permissions", rbac.deletePermission);
router.get('/roles', rbac.getRoles);
router.post("/roles", rbac.createRole);
router.delete("/roles", rbac.deleteRole);
router.put("/roles/:roleId/permissions", rbac.assignPermissionToRole);

module.exports = router;
