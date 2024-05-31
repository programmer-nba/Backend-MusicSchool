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
app.use(prefix + '/auth', require('./routes/auth_route'))
app.use(prefix + '/user', require('./routes/user_route'))

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A client connected.');

    // Example socket event
    socket.on('example', (data) => {
        console.log('Received data:', data);
    });

    // Example sending data to client
    setInterval(() => {
        socket.emit('message', 'Hello from server!');
    }, 5000);

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