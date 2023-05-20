const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIO = require("socket.io");
const userRoute = require("./routes/Authentication.js");
const profileRoute = require("./routes/Profiles.js");
const { v4: uuidv4 } = require("uuid");
require("./db.js");

// create express application
const app = express();
const server = http.createServer(app);

// make socketIo listen on server
const io = socketIO(server);

// use middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/user", userRoute);
app.use("/profiles", profileRoute);

// create a message queue for users
const messageQueue = {};

// on connection
io.on("connection", (socket) => {
  console.log("client connected", socket.id);

  socket.on("join", (userId) => {
    // store this user id if this  user wants to send a message,
    // it will be carried in the payload
    socket.userId = userId;
    console.log("user with userId", userId, "joined");

    // if there are messages for this user in message queue send all messages on this socket
    const queuedMessages = messageQueue[userId] || [];
    queuedMessages.forEach((message) => {
      socket.emit("message", message);
    });
    delete messageQueue[userId]; // delete messages for this user from message queue
  });

  socket.on("message", (message) => {
    console.log("Message received", message);

    const messageToSend = {
      id: uuidv4(), // generate a unique message ID
      sender: socket.userId,
      text: message.text,
      timestamp: new Date(),
      senderDetails: message.senderDetails,
    };

    // Find the socket with the specified user ID and emit the message
    const receiverSocket = Object.values(io.sockets.sockets).find(
      (s) => s.userId === message.receiver
    );
    if (receiverSocket) {
      receiverSocket.emit("message", messageToSend);
    } else {
      // If the receiver is not online, add the message to the queue
      messageQueue[message.receiver] = messageQueue[message.receiver] || [];
      messageQueue[message.receiver].push(messageToSend);
    }
  });
});

// define port
const port = process.env.PORT || 3000;

// listen on port
server.listen(port, () => console.log(`App listening on port ${port}`));
