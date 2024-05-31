const mongoose = require('mongoose')
const { Schema } = mongoose

const teacherSchema = new Schema(
    {
        username: { type: String, require: true }, 
        password: { type: String, require: true },
        name: { type: String, require: true },
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        prefix: { type: String, require: true, enum: ['นาย', 'นาง', 'นางสาว'] },
        phoneNumber: { type: String, default: '-' },
        email: { type: String, default: '-' },
        lineId: { type: String, default: '-' },
        active: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher