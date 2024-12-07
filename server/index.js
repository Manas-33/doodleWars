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

  app.use(cors({
    origin: "http://localhost:5173", 
    methods: "POST, GET",
    allowedHeaders: "Content-Type",
  }));

  app.use(express.json());

// Store rooms and players
const rooms = {};

const voteData = {
    votes: {}, 
    voteCounts: {}, 
};

app.post("/vote", (req, res) => {
    console.log("Printing request: ", req.body)
    const { voter, target } = req.body;
    
    if (!voter || !target) {
      return res
        .status(400)
        .json({ success: false, message: "Voter and target are required." });
    }
  
    // Check if voter already voted for someone
    if (voteData.votes[voter]) {
      const previousTarget = voteData.votes[voter];
      voteData.voteCounts[previousTarget]--; // Decrease vote count for previous target
    }
  
    // Register the new vote
    voteData.votes[voter] = target;
  
    // Increment the new target's vote count
    if (!voteData.voteCounts[target]) {
      voteData.voteCounts[target] = 0;
    }
    voteData.voteCounts[target]++;

    console.log("Vote Data: ", voteData)
  
    return res.json({
      success: true,
      message: `${voter} voted for ${target}.`,
      voteCounts: voteData.voteCounts,
    });
  });
  
  app.get("/votes", (req, res) => {
    return res.json({
      success: true,
      voteCounts: voteData.voteCounts,
      votes: voteData.votes,
    });
  });
  

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

    if (!room.players.includes(nickname)) {
        room.players.push(nickname);
    }
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
