const retrieveMessages = (socket, messages) => {
  socket.on('retrieveImages', () => {
    socket.emit('getMessages', (messages))
  })
}

module.exports = retrieveMessages