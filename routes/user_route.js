const router = require('express').Router()
const User = require('../controllers/user_controller')

router.get('/teachers', User.getTeachers)
router.get('/teacher', User.getTeacher)
router.put('/teacher/:id', User.updateTeacher)
router.delete('/teacher/:id', User.deleteTeacher)

module.exports = router