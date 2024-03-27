const router = require('express').Router();
const rbac = require('../controllers/rbac.controller.js');

// parent path : /rbac 
router.get('/permissions', rbac.getPermissions);
router.post('/permissions', rbac.addPermission);
router.post('/roles', rbac.createRole);
router.get('/roles', rbac.getRoles);
router.put('/roles/:roleId/permissions', rbac.assignPermissionToRole);



module.exports = router;