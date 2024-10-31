const express = require("express");
const { Server } = require("socket.io")
const app = express();
const http = require("http");
const cors = require("cors")
const PORT = 3001;
// middleware for acces to work with cors
app.use(cors())
// prepearing our server to work
const server = http.createServer(app);
// new instance of our Socket.io server, first param is http server, second param cors
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

// listener on EVERY NEW websocket connection 
io.on("connection", socket => {
    const rooms = []
    console.log(`someone joined to session ${socket.id}`);

    socket.on("sendMsg", data => {
        console.log(data);
        socket.broadcast.emit("recvMsg", data)
    })

    socket.on("enterRoom", data => {
        rooms.push(data)
        if (rooms[rooms.length - 1] === "") {
            rooms.pop();
        }
        socket.join(rooms[rooms.length - 1])
        console.log(rooms);
    })


    io.to(rooms[rooms.length - 1]).emit("sendMsg")

})


server.listen(PORT, () => console.log("Server is running!"))