const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, "static")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "html", "index.html"))
})

const rooms = {};

io.on('connection', (socket) => {
    socket.on("join-room", (data) => {
        socket.join(data.id)
        rooms[socket.id] = data.id;

        setTimeout(() => {
            socket.emit("connect_success")
            io.to(data.id).emit("join", data.name);
        }, 1000)
    })
});

server.listen(5000, () => {
    console.log('http://localhost:5000');
});