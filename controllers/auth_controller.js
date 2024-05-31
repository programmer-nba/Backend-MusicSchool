const Teacher = require('../models/teacher_model')
const Admin = require('../models/admin_model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const SECRETKEY = process.env.SECRETKEY
if (!SECRETKEY) {
    throw new Error("SECRETKEY environment variable is not defined.");
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    try {
        if (!username || !password) {
            return res.status(404).json({
                message: 'กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน'
            })
        }

        let teacher = await Teacher.findOne({ username: username })
        let admin = null
        let payload = {}

        if (!teacher) {
            admin = await Admin.findOne({ username: username })
            if (!admin) {
                return res.status(404).json({
                    message: 'ไม่พบรหัสผู้ใช้งาน'
                })
            }
            const validPassword = await bcrypt.compare(password, admin.password)
            if (!validPassword) {
                return res.status(401).json({
                    message: 'รหัสผ่านไม่ถูกต้อง',
                })
            }
            payload = {
                _id: admin._id,
                name: 'admin',
                role: 'admin'
            }
        } else {
            const validPassword = await bcrypt.compare(password, teacher.password)
            if (!validPassword) {
                return res.status(401).json({
                    message: 'รหัสผ่านไม่ถูกต้อง',
                })
            }
            payload = {
                _id: teacher._id,
                name: teacher.name,
                role: 'teacher'
            }
        }

        const token = jwt.sign(payload, SECRETKEY, { expiresIn: '4h' })

        return res.status(200).json({
            message: 'เข้าสู่ระบบสำเร็จ',
            token: token
        })

    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.registerTeacher = async (req, res) => {
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
        if (!username || !password || !prefix || !firstName || !lastName) {
            return res.status(404).json({
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            })
        }
        const existTeacher = await Teacher.findOne({ username: username })
        if (existTeacher) {
            return res.status(408).json({
                message: 'รหัสผู้ใช้งานนี้อยู่ในระบบแล้ว',
            })
        }

        const protectedPassword = await bcrypt.hash(password, 10)
        const name = `${firstName} ${lastName}`
        const newTeacher = {
            username : username, 
            password : protectedPassword,
            name : name,
            firstName : firstName,
            lastName : lastName,
            prefix : prefix,
            phoneNumber : phoneNumber,
            email: email,
            lineId: lineId
        }
        const teacher = new Teacher(newTeacher)
        const savedTeacher = await teacher.save()
        if (!savedTeacher) {
            return res.status(500).json({
                message: 'ไม่สามารถบันทึกข้อมูลได้'
            })
        }

        return res.status(200).json({
            message: 'สร้างผู้ใช้งานสำเร็จ',
            status: true,
            data: savedTeacher
        })
    }
    catch(err) {
        console.log(err)
        return resizeBy.status(500).json({
            message: err.message
        })
    }
}

exports.registerAdmin = async (req, res) => {
    const { 
        username,
        password,
    } = req.body
    try {
        if (!username || !password) {
            return res.status(404).json({
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
            })
        }
        const existAdmin = await Admin.findOne({ username: username })
        if (existAdmin) {
            return res.status(408).json({
                message: 'รหัสผู้ใช้งานนี้อยู่ในระบบแล้ว',
            })
        }

        const protectedPassword = await bcrypt.hash(password, 10)
        const newAdmin = {
            username : username, 
            password : protectedPassword,
            name : username,
        }
        const admin = new Teacher(newAdmin)
        const savedAdmin = await admin.save()
        if (!savedAdmin) {
            return res.status(500).json({
                message: 'ไม่สามารถบันทึกข้อมูลได้'
            })
        }

        return res.status(200).json({
            message: 'สร้างผู้ใช้งานสำเร็จ',
            status: true,
            data: savedAdmin
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}