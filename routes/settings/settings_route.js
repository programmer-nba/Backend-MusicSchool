const router = require('express').Router()
const School = require('../../controllers/school_controller')
const { authAdmin, authAny } = require('../../middlewares/authorization')

router.get('/:school_id/full-class', authAny, School.getFullClassRoom)

router.post('/school', authAdmin, School.createSchool)
router.get('/schools', authAdmin, School.getSchools)
router.get('/school/:id', authAny, School.getSchool)
router.put('/school/:id', authAny, School.updateSchool)
router.delete('/school/:id', authAdmin, School.deleteSchool)

router.post('/classroom', authAny, School.createClassRoom)
router.get('/:school_id/classrooms', authAny, School.getClassRoomsOfSchool)
router.get('/classroom/:id', authAny, School.getClassRoom)
router.put('/classroom/:id', authAny, School.updateClassRoom)
router.delete('/classroom/:id', authAdmin, School.deleteClassRoom)

module.exports = router