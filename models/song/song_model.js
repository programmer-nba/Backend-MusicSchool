const mongoose = require('mongoose')
const { Schema } = mongoose

const songSchema = new Schema(
    {
        songName: { type: String, require: true },
    },
    {
        timestamps: true
    }
)

const Song = mongoose.model('Song', songSchema)
module.exports = Song