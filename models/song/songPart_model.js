const mongoose = require('mongoose')
const { Schema } = mongoose

const songPartSchema = new Schema(
    {
        songId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Song', 
            require: true 
        },
        part: { type: Number, require: true },
        keys: { type: Array, default: [] }
    },
    {
        timestamps: true
    }
)

const SongPart = mongoose.model('SongPart', songPartSchema)
module.exports = SongPart