const router = require('express').Router()
const rbac = require('./rbac.route')
const auth = require('./auth/login_logout.route')

router.use('/rbac', rbac);
router.use('/auth', auth);

module.exports = router;