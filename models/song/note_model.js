const mongoose = require('mongoose')
const { Schema } = mongoose

const noteSchema = new Schema(
    {
        key: { type: String, require: true },
        note: { type: String, require: true }
    },
    {
        timestamps: true
    }
)

const Note = mongoose.model('Note', noteSchema)
module.exports = Note