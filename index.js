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

io.on('connection', (socket) => {
});

server.listen(5000, () => {
    console.log('http://localhost:5000');
});