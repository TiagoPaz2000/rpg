const sendMessage = (socket, io, messages, msgId) => {
  socket.on('sendMessage', (data) => {
    messages.push({ ...data, id: msgId })
    io.emit('getMessages', (messages))
  })
}

module.exports = sendMessage