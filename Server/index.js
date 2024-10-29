const express = require("express");
const { Server } = require("socket.io")
const app = express();
const http = require("http");
const cors = require("cors")


// middleware for acces to work with cors
app.use(cors())

// prepearing our server to work
const server = http.createServer(app);


// new instance of our Socket.io server, first param is http server, second param is cors
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`user connected: ${socket.id} `);
    socket.on("sendMessage", (data) => {
        socket.broadcast.emit("recieveMessage", data)
    })
})


server.listen(3001, () => console.log("Server is running!"))