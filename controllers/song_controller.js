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

// songPart
exports.createSongPart = async (req, res) => {
    try {
        const { songName, songFileName, part, keys } = req.body
        if (!songName || !part) {
            return res.status(400).json({
                message: "songName and part are require!"
            })
        }
        
        const songPart = await SongPart.create({
            songName: songName,
            songFileName: songFileName,
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
        const { songName, songFileName, part, keys } = req.body
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                message: "need id on params"
            })
        }
        const songPart = await SongPart.findByIdAndUpdate(id, {
            $set: {
                songName: songName,
                songFileName: songFileName,
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
        const songParts = await SongPart.find()

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