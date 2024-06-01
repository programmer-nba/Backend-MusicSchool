const router = require('express').Router()
const User = require('../../controllers/user_controller')
const Auth = require('../../middlewares/authorization')

router.get('/teachers', Auth.authAdmin, User.getTeachers)
router.get('/teacher',Auth.authAny, User.getTeacher)
router.put('/teacher/:id', Auth.authAny, User.updateTeacher)
router.delete('/teacher/:id', Auth.authAny, User.deleteTeacher)

module.exports = router