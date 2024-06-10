const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const socketIo = require('socket.io')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Set the view engine to ejs
app.set('view engine', 'ejs')

// Serve static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

// routers api
const prefix = '/piano/api/v1.0'
app.use(prefix + '/auth', require('./routes/auth/auth_route'))
app.use(prefix + '/user', require('./routes/user/user_route'))
app.use(prefix, require('./routes/song/song_route'))
app.use(prefix + '/settings', require('./routes/settings/settings_route')) // school, class, student

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A client connected.');

    // Handle incoming offer from sender
    socket.on('offer', (offer) => {
        console.log('Received offer from sender:', offer);
        // Broadcast the offer to all other clients (potential receivers)
        socket.broadcast.emit('offer', offer);
    });

    // Handle incoming answer from receiver
    socket.on('answer', (answer) => {
        console.log('Received answer from receiver:', answer);
        // Broadcast the answer to all other clients (potential senders)
        socket.broadcast.emit('answer', answer);
    });

    // Handle incoming ICE candidate from sender or receiver
    socket.on('icecandidate', (candidate) => {
        console.log('Received ICE candidate:', candidate);
        // Broadcast the ICE candidate to all other clients
        socket.broadcast.emit('icecandidate', candidate);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
})

// MongoDB connection
const MONGODB_URI = process.env.DB;

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫');
    console.log('♪   MongoDB connected successfully    ♫');

    // Start the server after successful database connection
    const PORT = process.env.PORT || 12000;
    server.listen(PORT, () => {
        console.log(`♪   Server is running on port ${PORT}   ♫`);
        console.log('♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫ ♪ ♫');
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});