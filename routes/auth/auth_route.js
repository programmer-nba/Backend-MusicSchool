const router = require('express').Router()
const Auth = require('../../controllers/auth_controller')

router.post('/login', Auth.login)
router.post('/register/teacher', Auth.registerTeacher)
router.post('/register/admin', Auth.registerAdmin)

module.exports = router