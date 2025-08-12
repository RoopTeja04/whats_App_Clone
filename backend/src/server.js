const http = require("http");
const socketIo = require("socket.io");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");

    // Join a room for the given chatId
    socket.on("joinRoom", (chatId) => {
        socket.join(chatId);
        console.log(`Client joined room: ${chatId}`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

global.io = io;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});