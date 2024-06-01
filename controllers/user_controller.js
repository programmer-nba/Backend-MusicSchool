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
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getTeacher = async (req, res) => {
    const { id } = req.query
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
        return res.status(500).json({
            message: err.message
        })
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
        lineId,
        school_id
    } = req.body
    try {
        if (!id) {
            return res.status(401).json({
                message: "กรุณาแนบ _id ของคุณครูมาด้วย"
            })
        }

        // Create the $set object only with fields that are provided
        const updateFields = {};
        if (username) updateFields.username = username;
        if (firstName && lastName) updateFields.name = `${firstName} ${lastName}`;
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (prefix) updateFields.prefix = prefix;
        if (phoneNumber) updateFields.phoneNumber = phoneNumber;
        if (email) updateFields.email = email;
        if (lineId) updateFields.lineId = lineId;
        if (school_id) updateFields.school_id = school_id;

        // Handle password update separately
        if (password) {
            const protectedPassword = await bcrypt.hash(password, 10);
            updateFields.password = protectedPassword;
        }

        const teacher = await Teacher.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
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
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteTeacher = async (req, res) => {
    const { id } = req.params
    try {
        if (!id) {
            return res.status(401).json({
                message: "กรุณาแนบ _id ของคุณครูมาด้วย"
            })
        }

        const result  = await Teacher.findByIdAndDelete(id)
        if (!result) {
            return res.status(404).json({
                message: "ไม่พบ user นี้ในระบบ"
            })
        }

        return res.status(200).json({
            message: "success",
            status: true,
            data: result.deletedCount
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}