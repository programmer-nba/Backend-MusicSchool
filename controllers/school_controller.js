const School = require('../models/school_model')
const ClassRoom = require('../models/classRoom_model')
const Teacher = require('../models/teacher_model')
const Student = require('../models/student_model')

// full -----------------------------------
exports.getFullClassRoom = async (req, res) => {
    const { school_id } = req.params
    try {
        const school = await School.findById(school_id).select('-__v')
        if (!school) {
            return res.status(404).json({
                message: "ไม่พบโรงเรียนนี้ในระบบ"
            })
        }
        const classRooms = await ClassRoom.find({ school_id: school_id }).select('-__v')
        const teachers = await Teacher.find({ school_id: school_id }).select('-__v -password -username')

        const result = {
            school: school,
            classRooms: classRooms,
            teachers: teachers
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: result
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}


// school ---------------------------------
exports.createSchool = async (req, res) => {
    const { name, schoolType } = req.body
    try {
        if (!name) {
            return res.status(401).json({
                message: "name is require!"
            })
        }
        const existSchool = await School.find({ name: name.trim() })
        if (existSchool.length) {
            return res.status(401).json({
                message: "มีชื่อโรงเรียนนี้ในระบบแล้ว กรุณาตรวจเช็ค"
            })
        }

        const newSchool = {
            name: name,
            schoolType: schoolType
        }

        const school = await School.create(newSchool)
        if (!school) {
            return res.status(500).json({
                message: "ไม่สามารถสร้างโรงเรียนได้"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: school
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateSchool = async (req, res) => {
    const { name, schoolType, active } = req.body
    const { id } = req.params
    try {
        if (!["ประถม", "มัถยม"].includes(schoolType)) {
            return res.status(400).json({
                message: "schoolType ต้องเป็น ประถม หรือ มัถยม เท่านั้น"
            })
        }
        const school = await School.findByIdAndUpdate(id,{
            $set: {
                name : name, 
                schoolType : schoolType, 
                active: active
            }
        }, { new : true })
        if (!school) {
            return res.status(500).json({
                message: "ไม่สามารถอัพเดทข้อมูลโรงเรียนได้"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: school
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getSchools = async (req, res) => {
    try {
        const schools = await School.find()

        return res.status(200).json({
            message: `มีโรงเรียน ${schools.length} โรง`,
            status: true,
            data: schools
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getSchool = async (req, res) => {
    const { id } = req.params
    try {
        const school = await School.findById(id)
        if (!school) {
            return res.status(404).json({
                message: "ไม่พบโรงเรียนนี้ในระบบ",
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: school
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteSchool = async (req, res) => {
    const { id } = req.params
    try {
        const result = await School.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({
                message: "ไม่พบโรงเรียนนี้ในระบบ",
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: result.deletedCount
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}


// class room ------------------------------
exports.createClassRoom = async (req, res) => {
    const { school_id, classType, room } = req.body
    try {
        if (!school_id || !classType || !room) {
            return res.status(401).json({
                message: "กรุณาส่งข้อมูลให้ครบ",
                payload: req.body
            })
        }
        const existClassRoom = await ClassRoom.find({ school_id: school_id, classType: classType, room: room })
        if (existClassRoom.length) {
            return res.status(401).json({
                message: "มีชื่อห้องนี้ในระบบแล้ว กรุณาตรวจเช็ค"
            })
        }

        const newClassRoom = {
            school_id: school_id,
            classType: classType,
            room: room
        }

        const classRoom = await ClassRoom.create(newClassRoom)
        if (!classRoom) {
            return res.status(500).json({
                message: "ไม่สามารถสร้างห้องเรียนได้"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: classRoom
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateClassRoom = async (req, res) => {
    const { school_id, classType, room, active, status } = req.body
    const { id } = req.params
    try {
        const classRoom = await ClassRoom.findByIdAndUpdate(id, {
            $set: {
                school_id: school_id?.toString(),
                classType: classType?.toString(),
                room: parseInt(room),
                active: active,
                status: status
            }
        }, { new : true })
        if (!classRoom) {
            return res.status(404).json({
                message: "ไม่พบห้องเรียนนี้ในระบบ"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: classRoom
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getClassRooms = async (req, res) => {
    try {
        const classRooms = await ClassRoom.find()

        return res.status(200).json({
            message: `มีห้องเรียน ${classRooms.length} ห้อง`,
            status: true,
            data: classRooms
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getClassRoom = async (req, res) => {
    const { id } = req.params
    try {
        const classRoom = await ClassRoom.findById(id)
        if (!classRoom) {
            return res.status(404).json({
                message: "ไม่พบห้องเรียนนี้ในระบบ",
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: classRoom
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteClassRoom = async (req, res) => {
    const { id } = req.params
    try {
        const result = await ClassRoom.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({
                message: "ไม่พบห้องเรียนนี้ในระบบ",
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: result.deletedCount
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

// students ----------------------------------
exports.createStudent = async (req, res) => {
    const { code, firstName, lastName, prefix, classRoom_id, studentNumber } = req.body
    try {
        if (!firstName || !lastName || !prefix || !classRoom_id || !code) {
            return res.status(400).json({
                message: 'กรุณาส่งข้อมูลให้ครบ => code, firstName, lastName, prefix, classRoom_id, studentNumber'
            })
        }
        if (!['เด็กชาย', 'เด็กหญิง'].includes(prefix)) {
            return res.status(400).json({
                message: 'กรุณาใส่ prefix ให้ถูกต้อง => เด็กชาย, เด็กหญิง'
            })
        }

        const existStudent = await Student.findOne({ classRoom_id: classRoom_id, studentNumber: studentNumber })
        if (existStudent) {
            return res.status(400).json({
                message: 'นักเรียนเลขที่นี้มีอยู่ในระบบแล้ว',
                data: `${existStudent.name} ห้อง ${existStudent.classType}/${existStudent.room} เลขที่ ${existStudent.studentNumber}`
            })
        }

        const prefixShort = prefix === 'เด็กชาย' ? 'ด.ช.' : 'ด.ญ.'
        const name = `${prefixShort}${firstName} ${lastName}`
        const classRoom = await ClassRoom.findById(classRoom_id)
        if (!classRoom) {
            return res.status(404).json({
                message: 'ไม่พบห้องเรียนนี้ในระบบ'
            })
        }

        const school_id = classRoom.school_id
        const classType = classRoom.classType
        const room = classRoom.room

        const newStudent = {
            code: code,
            name: name,
            firstName: firstName,
            lastName: lastName,
            prefix: prefix,
            prefixShort: prefixShort,
            school_id: school_id,
            classRoom_id: classRoom_id,
            classType: classType,
            room: room,
            studentNumber: studentNumber
        }

        const student = await Student.create(newStudent)
        if (!student) {
            return res.status(500).json({
                message: "ไม่สามารถบันทึกข้อมูล"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: student
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateStudent = async (req, res) => {
    const { code, firstName, lastName, prefix, classRoom_id, studentNumber, active } = req.body
    const { id } = req.params
    try {
        const existStudent = await Student.findById(id)
        if (!existStudent) {
            return res.status(404).json({
                message: "ไม่พบนักเรียนคนนี้ในระบบ"
            })
        }

        if (prefix && !['เด็กชาย', 'เด็กหญิง'].includes(prefix)) {
            return res.status(400).json({
                message: "กรุณาใส่ prefix ให้ถูกต้อง => เด็กชาย, เด็กหญิง"
            })
        }
        const prefixShort = prefix ? (prefix === 'เด็กชาย' ? 'ด.ช.' : 'ด.ญ.') : existStudent.prefixShort
        const name = `${prefixShort}${firstName || existStudent.firstName} ${lastName || existStudent.lastName}`

        let school_id = null
        let classType = null
        let room = null

        if (classRoom_id) {
            const classRoom = await ClassRoom.findById(classRoom_id)
            if (!classRoom) {
                return res.status(404).json({
                    message: 'ไม่พบห้องเรียนนี้ในระบบ'
                })
            }
            const existedStudent = await Student.findOne({ classRoom_id: classRoom_id, studentNumber: studentNumber })
            if (existedStudent && existedStudent.studentNumber !== existStudent.studentNumber) {
                return res.status(400).json({
                    message: 'นักเรียนเลขที่นี้มีอยู่ในระบบแล้ว',
                    data: `${existedStudent.name} ห้อง ${existedStudent.classType}/${existedStudent.room} เลขที่ ${existedStudent.studentNumber}`
                })
            }
            school_id = classRoom.school_id
            classType = classRoom.classType
            room = classRoom.room
        } else {
            const existedStudent = await Student.findOne({ classRoom_id: existStudent.classRoom_id, studentNumber: existStudent.studentNumber })
            if (existedStudent && existedStudent.studentNumber !== existStudent.studentNumber) {
                return res.status(400).json({
                    message: 'นักเรียนเลขที่นี้มีอยู่ในระบบแล้ว',
                    data: `${existedStudent.name} ห้อง ${existedStudent.classType}/${existedStudent.room} เลขที่ ${existedStudent.studentNumber}`
                })
            }
            school_id = existStudent.school_id
            classType = existStudent.classType
            room = existStudent.room
        }

        const student = await Student.findByIdAndUpdate(id, {
            $set: {
                code: code,
                name: name,
                firstName: firstName,
                lastName: lastName,
                prefix: prefix,
                prefixShort: prefixShort,
                school_id: school_id,
                classRoom_id: classRoom_id,
                classType: classType,
                room: room,
                studentNumber: studentNumber,
                active: active
            }
        }, { new: true })
        if (!student) {
            return res.status(500).json({
                message: "ไม่สามารถบันทึกข้อมูล"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: student
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().select('-__v')

        return res.status(200).json({
            message: `มีนักเรียน ${students.length} คน`,
            status: true,
            data: students
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json(
            {
                message: err.message
            }
        )
    }
}

exports.getStudent = async (req, res) => {
    const { id } = req.params
    try {
        const student = await Student.findById(id).select('-__v')
        if (!student) {
            return res.status(404).json({
                message: 'ไม่พบนักเรียนคนนี้ในระบบ'
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: student
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json(
            {
                message: err.message
            }
        )
    }
}

exports.deleteStudent = async (req, res) => {
    const { id } = req.params
    try {
        const student = await Student.findByIdAndDelete(id)
        if (!student) {
            return res.status(404).json({
                message: 'ไม่พบนักเรียนคนนี้ในระบบ'
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: student.deletedCount
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json(
            {
                message: err.message
            }
        )
    }
}



