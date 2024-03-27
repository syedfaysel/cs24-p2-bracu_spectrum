const router = require('express').Router()
const rbac = require('./rbac.route')

router.use('/rbac', rbac);

module.exports = router;