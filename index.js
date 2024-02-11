require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on ${process.env.PORT || 3000}`);
});
