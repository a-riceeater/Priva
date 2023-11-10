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
const users = {}

io.on('connection', (socket) => {
    socket.on("join-room", (data) => {
        socket.join(data.id)
        rooms[socket.id] = data.id;
        if (!users[data.id]) users[data.id] = []

        setTimeout(() => {
            socket.emit("connect_success", users[data.id])
            io.to(data.id).emit("join", data.name);
            users[data.id].push({ name: data.name, id: socket.id })
        }, 1000)
    })

    socket.on("disconnect", () => {
        if (!users[rooms[socket.id]] || !rooms[socket.id]) return

        const urs = users[rooms[socket.id]]
        for (let i = 0; i < urs.length; i++) {
            if (urs[i].id == socket.id) {
                users[rooms[socket.id]].splice(i, 1)
            }
        }

        delete rooms[socket.id]
    })

    socket.on("ping", (date) => {
        socket.emit("pong", date)
    })
});


server.listen(5000, () => {
    console.log('http://localhost:5000');
});