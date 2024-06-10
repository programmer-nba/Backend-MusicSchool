const Song = require('../models/song/song_model')
const Note = require('../models/song/note_model')
const SongPart = require('../models/song/songPart_model')

// note
exports.createNote = async (req, res) => {
    try {
        const { key, note } = req.body
        const songNote = await Note.create({
            key: key,
            note: note
        })
        if (!songNote) {
            return res.status(400).json({
                message: 'can not create note!'
            })
        }

        return res.status(200).json({
            message: 'success!',
            status: true,
            data: songNote
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateNote = async (req, res) => {
    try {
        const { key, note } = req.body
        const { id } = req.params
        const songNote = await Note.findByIdAndUpdate(id, {
            $set: {
                key: key,
                note: note
            }
        }, { new : true })
        if (!songNote) {
            return res.status(404).json({
                message: 'note not found'
            })
        }

        return res.status(200).json({
            message: 'success!',
            status: true,
            data: songNote
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getNotes = async (req, res) => {
    try {
        const songNotes = await Note.find()

        return res.status(200).json({
            message: `have ${songNotes.length} notes`,
            status: true,
            data: songNotes
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getNote = async (req, res) => {
    try {
        const { id } = req.params
        const songNote = await Note.findById(id)
        if (!songNote) {
            return res.status(404).json({
                message: "note not found!"
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: songNote
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params
        const songNote = await Note.deleteOne({_id: id})
        if (!songNote) {
            return res.status(404).json({
                message: "note not found!"
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: songNote.deletedCount
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

// song
exports.createSong = async (req, res) => {
    try {
        const { songName } = req.body
        const song = await Song.create({
            songName: songName
        })
        if (!song) {
            return res.status(400).json({
                message: 'can not create song!'
            })
        }

        return res.status(200).json({
            message: 'success!',
            status: true,
            data: song
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateSong = async (req, res) => {
    try {
        const { songName } = req.body
        const { id } = req.params
        const song = await Song.findByIdAndUpdate(id, {
            $set: {
                songName: songName
            }
        }, { new : true })
        if (!song) {
            return res.status(404).json({
                message: 'song not found'
            })
        }

        return res.status(200).json({
            message: 'success!',
            status: true,
            data: song
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getSongs = async (req, res) => {
    try {
        const songs = await Song.find()

        return res.status(200).json({
            message: `have ${songs.length} songs`,
            status: true,
            data: songs
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getSong = async (req, res) => {
    try {
        const { id } = req.params
        const song = await Song.findById(id)
        if (!song) {
            return res.status(404).json({
                message: "song not found!"
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: song
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteSong = async (req, res) => {
    try {
        const { id } = req.params
        const songParts = await SongPart.deleteMany({songId: id})
        const song = await Song.deleteOne({_id: id})
        if (!song) {
            return res.status(404).json({
                message: "song not found!"
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: {
                song: song.deletedCount,
                songParts: songParts.deletedCount
            }
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

// songPart
exports.createSongPart = async (req, res) => {
    try {
        const { songId, part, keys } = req.body
        if (!songId || !part) {
            return res.status(400).json({
                message: "songId and part are require!"
            })
        }
        const existSong = await Song.findById(songId)
        if (!existSong) {
            return res.status(404).json({
                message: "song not found"
            })
        }
        const songPart = await SongPart.create({
            songId: songId,
            part: part,
            keys: keys
        })
        if (!songPart) {
            return res.status(400).json({
                message: 'can not create songPart!'
            })
        }

        return res.status(200).json({
            message: 'success!',
            status: true,
            data: songPart
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateSongPart = async (req, res) => {
    try {
        const { part, keys } = req.body
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                message: "need id on params"
            })
        }
        const songPart = await SongPart.findByIdAndUpdate(id, {
            $set: {
                part: part,
                keys: keys
            }
        }, { new : true })
        if (!songPart) {
            return res.status(404).json({
                message: 'songPart not found'
            })
        }

        return res.status(200).json({
            message: 'success!',
            status: true,
            data: songPart
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateSongPartKey = async (req, res) => {
    try {
        const { id, keyId } = req.params;
        const { key } = req.body
        if (!id || !keyId) {
            return res.status(400).json({
                message: "need id and keyId on params"
            });
        }

        // Find the document first to ensure the key exists
        const songPart = await SongPart.findOne({ _id: id, 'keys._id': keyId });
        if (!songPart) {
            return res.status(404).json({
                message: 'songPart or key not found'
            });
        }

        // Perform the update
        const updatedSongPart = await SongPart.findOneAndUpdate(
            { _id: id, 'keys._id': keyId },
            { 
                $set: {
                    'keys.$': key // Assuming the new key data is in req.body.key
                }
            },
            { new: true }
        );

        return res.status(200).json({
            message: 'success!',
            status: true,
            data: updatedSongPart
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getSongParts = async (req, res) => {
    try {
        const { songId } = req.params
        const songParts = await SongPart.find({songId:songId })

        return res.status(200).json({
            message: `have ${songParts.length} parts`,
            status: true,
            data: songParts
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getSongPart = async (req, res) => {
    try {
        const { id } = req.params
        const songPart = await SongPart.findById(id)
        if (!songPart) {
            return res.status(404).json({
                message: "songPart not found!"
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: songPart
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteSongPart = async (req, res) => {
    try {
        const { id } = req.params
        const result = await SongPart.deleteOne({_id:id})
        if (!result.deletedCount) {
            return res.status(404).json({
                message: "songPart not found!"
            })
        }

        return res.status(200).json({
            message: `success`,
            status: true,
            data: result.deletedCount
        })
        
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message: err.message
        })
    }
}