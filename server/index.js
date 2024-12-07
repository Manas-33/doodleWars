const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"],
    },
  });

app.use(cors());

// Store rooms and players
const rooms = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Create a new room
  socket.on("createRoom", ({ nickname: username, players }, callback) => {
    const roomId = Math.random().toString(36).substring(2, 8); // Generate a room ID
    rooms[roomId] = { players: [], maxPlayers: players };

    rooms[roomId].players.push(username);
    socket.join(roomId);

    console.log(`Room ${roomId} created by ${username}`);
    callback({ success: true, roomId });
  });

  // Join an existing room
  socket.on("joinRoom", ({ gameCode, nickname }, callback) => {
    console.log(`${nickname} with this ${gameCode}`);
    const room = rooms[gameCode];

    if (!room) {
      return callback({ success: false, message: "Room not found" });
    }
    if (room.players.length >= room.maxPlayers) {
      return callback({ success: false, message: "Room is full" });
    }

    room.players.push(nickname);
    socket.join(gameCode);

    console.log(`${nickname} joined room: ${gameCode}`);
    io.to(gameCode).emit("playerJoined", `${nickname} has joined the room.`);
    io.to(gameCode).emit("updatePlayers", room.players);
    callback({ success: true, gameCode });
  });

  // Disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
