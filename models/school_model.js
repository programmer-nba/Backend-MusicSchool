const mongoose = require('mongoose')
const { Schema } = mongoose

const schoolSchema = new Schema(
    {
        name: { type: String, require: true },
        schoolType: { type: String, default: "ประถม", enum: ["ประถม", "มัถยม"] },
        active: { type: Boolean, default: true }
    },
    {
        timestamps: true
    }
)

const School = mongoose.model('School', schoolSchema)
module.exports = School