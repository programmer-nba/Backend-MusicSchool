const mongoose = require('mongoose')
const { Schema } = mongoose

const studentSchema = new Schema(
    {
        code: { type: String, require: true },
        name: { type: String, require: true },
        firstName: { type: String, require: true },
        lastName: { type: String, require: true },
        prefix: { type: String, require: true, enum: ['เด็กชาย', 'เด็กหญิง'] },
        prefixShort: { type: String, require: true, enum: ['ด.ช.', 'ด.ญ.'] },
        school_id: { type: String, require: true },
        classRoom_id: { type: String, require: true },
        classType: { type: String, require: true },
        studentNumber: { type: Number, require: true },
        room: { type: Number, require: true },
        active: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

const Student = mongoose.model('Student', studentSchema)
module.exports = Student