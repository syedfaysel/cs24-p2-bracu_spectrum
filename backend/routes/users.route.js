const router = require('express').Router();
const checkRole = require('../middlewares/checkRole.middleware');
const authMiddleware = require('../middlewares/authenticate.middleware');
const { roles } = require('../utils/roles');


//import users controller
const users = require('../controllers/users.controller');


router.post('/users', authMiddleware, checkRole(roles.admin), users.createUser);
router.get('/users', authMiddleware, checkRole(roles.admin), users.getUsers);



module.exports = router;