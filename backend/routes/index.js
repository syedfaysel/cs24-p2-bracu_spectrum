const router = require('express').Router()
const rbac = require('./rbac.route')
const auth = require('./auth/login_logout.route')
const users = require('./users.route')

router.use('/rbac', rbac);
router.use('/auth', auth);
router.use('/', users)

module.exports = router;