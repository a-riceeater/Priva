const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html"))
})

io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle audio streaming logic here
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});