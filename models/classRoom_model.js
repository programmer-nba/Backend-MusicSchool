const mongoose = require('mongoose')
const { Schema } = mongoose

const classRoomSchema = new Schema(
    {
        school_id: { type: String, require: true },
        classType: { type: String, require: true },
        room: { type: Number, require: true },
        active: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

const ClassRoom = mongoose.model('ClassRoom', classRoomSchema)
module.exports = ClassRoom