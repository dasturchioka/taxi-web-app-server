require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("./bot");

process.setMaxListeners(Infinity);

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const driver = {
  name: "Sardor Aminov",
  car: {
    name: "BMW",
    color: "Dark Blue",
    number: "90 900 OKA",
  },
  rating: "4.5",
  driverSince: "2017",
  phone: "95 171 31 47",
};

const prices = [5000, 6500, 4500, 10500, 13500, 4000, 6000, 14000, 12500];

app.get("/", (req, res) => res.json({ msg: "Hello" }));

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("clientJoined", async (data) => {
    const roomId = data.roomId;
    // har bir mijoz bilan individual shug'ullanish uchun socketda alohida `room` lar yaratiladi.
    // roomId esa mijozning ilovasida ixtiyoriy raqamlar yoki harflar orqali generatsiya qilinadi.
    socket.join(roomId);

    // mijoz taksi chaqiryabdi
    socket.on("clientRequesting", async (data) => {
      // ! database bilan bir nimalar bo'ldi...

      // oxirida unga taksi borayotganini bildiramiz va shu bilan birga unga haydovchi malumotlarini ham yuboramiz
      const pickedPrice = Math.floor(Math.random() * prices.length);

      const pickedTimeout = Math.floor(
        Math.random() * (10000 - 3000 + 1) + 3000
      );

      setTimeout(async () => {
        io.in(roomId).emit("driverIsGoing", { ...driver, price: pickedPrice });
      }, pickedTimeout);
    });
  });

  socket.on("disconnect", () => {
    console.log("disconnection");
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on ${process.env.PORT || 3000}`);
});
