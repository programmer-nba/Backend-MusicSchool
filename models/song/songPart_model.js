const mongoose = require('mongoose')
const { Schema } = mongoose

const songPartSchema = new Schema(
    {
        songName: { type: String, require: true },
        songFileName: { type: String },
        part: { type: Number, require: true },
        keys: { type: Array, default: [] }
    },
    {
        timestamps: true
    }
)

const SongPart = mongoose.model('SongPart', songPartSchema)
module.exports = SongPart