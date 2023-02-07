const express = require("express");
const app = express();
const PORT = 3001;

//👇🏻 New imports
const http = require("http").Server(app);
const cors = require("cors");

const routes = require('./presentation/routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes)

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const messages = []

io.on('connection', (socket) => {
  socket.on('retrieveImages', () => {
    socket.emit('getMessages', (messages))
  })

  socket.on('disconnect', () => {
    socket.disconnect()
    console.log('🔥: A user disconnected');
  });
  
  socket.on('joined', (data) => {
    // const userExist = users.find(({ username }) => username === socket.username)
    // if (!userExist) {
    //   users.push({ username: data.username, pokemons: [data.pokemonId], money: 100 })
    // }
    console.log('joined')
  })

  socket.on('sendMessage', (data) => {
    messages.push({ ...data, id: Date.now() + data.message })
    io.emit('getMessages', (messages))
  })
  
  socket.on('findUserInfo', (data) => {
    // const user = users.find(({ username }) => username === data.username)

    // socket.emit('userInfo', { user })
    console.log('findUserInfo')
  })
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});