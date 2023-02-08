const express = require("express");
const app = express();
const PORT = 3001;

//👇🏻 New imports
const http = require("http").Server(app);
const cors = require("cors")
require('dotenv').config()

const routes = require('./presentation/routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

app.use(routes)

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const messages = []

const usecases = require('./domain/usecases')

io.on('connection', (socket) => {
  usecases.retrieveMessages(socket, messages)
  const msgId = String(Math.random() * 100)
  usecases.sendMessage(socket, io, messages, msgId)
  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('🔥: A user disconnected');
  });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});