const Teacher = require('../models/teacher_model')
const Admin = require('../models/admin_model')
const bcrypt = require('bcrypt')

exports.getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find()

        return res.status(200).json({
            message: `มีครูในระบบ ${teachers.length} คน`,
            status: true,
            data: teachers
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.getTeacher = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(401).json({
                message: "กรุณาแนบ _id ของคุณครูมาด้วย"
            })
        }

        const teacher = await Teacher.findById(id)
        if (!teacher) {
            return res.status(404).json({
                message: "ไม่พบ user นี้ในระบบ"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: teacher
        })
    }
    catch (err) {
        console.log(err)
    }
}

exports.updateTeacher = async (req, res) => {
    const { id } = req.params
    const { 
        username, 
        password,
        firstName,
        lastName,
        prefix,
        phoneNumber,
        email,
        lineId
    } = req.body
    try {
        if (!id) {
            return res.status(401).json({
                message: "กรุณาแนบ _id ของคุณครูมาด้วย"
            })
        }

        const protectedPassword = await bcrypt.hash(password, 10)
        const name = `${firstName} ${lastName}`

        const teacher = await Teacher.findByIdAndUpdate(id, {
            $set: {
                username: username, 
                password: protectedPassword,
                name: name,
                firstName: firstName,
                lastName: lastName,
                prefix: prefix,
                phoneNumber: phoneNumber,
                email: email,
                lineId: lineId
            }
        })
        if (!teacher) {
            return res.status(404).json({
                message: "ไม่พบ user นี้ในระบบ"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: teacher
        })
    }
    catch (err) {
        console.log(err)
    }
}