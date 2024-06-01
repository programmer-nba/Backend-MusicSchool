const School = require('../models/school_model')
const ClassRoom = require('../models/classRoom_model')
const Teacher = require('../models/teacher_model')


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

exports.getClassRoomsOfSchool = async (req, res) => {
    const { school_id } = req.params
    try {
        const classRooms = await ClassRoom.find({ school_id: school_id })

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