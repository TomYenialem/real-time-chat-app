const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
// get messages

const reciverSoketId = (reciverId) => {
  return soketUsers[reciverId];
};

const soketUsers = {}; //userId=soketId

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  const userid = socket.handshake.query.userId;

  if (userid !== undefined) {
    soketUsers[userid] = socket.id;
  }

  io.emit("onlineuser", Object.keys(soketUsers));
  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    if (userid) {
      delete soketUsers[userid];
      io.emit("onlineuser", Object.keys(soketUsers));
    }
  });
});
module.exports = { httpServer, app, io, reciverSoketId };
