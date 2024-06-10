const router = require('express').Router()
const Song = require('../../controllers/song_controller')
const Auth = require('../../middlewares/authorization')

router.post('/song', Auth.authAdmin, Song.createSong)
router.put('/song/:id', Auth.authAdmin, Song.updateSong)
router.get('/songs', Auth.authAny, Song.getSongs)
router.get('/song/:id', Auth.authAny, Song.getSong)
router.delete('/song/:id', Auth.authAdmin, Song.deleteSong)

router.post('/song-part', Auth.authAdmin, Song.createSongPart)
router.put('/song-part/:id', Auth.authAdmin, Song.updateSongPart)
router.put('/song-part/:id/:keyId', Auth.authAdmin, Song.updateSongPartKey)
router.get('/song-parts/:songId', Auth.authAny, Song.getSongParts)
router.get('/song-part/:id', Auth.authAny, Song.getSongPart)
router.delete('/song-part/:id', Auth.authAdmin, Song.deleteSongPart)

module.exports = router