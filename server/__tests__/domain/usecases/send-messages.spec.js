const { createServer } = require("http")
const { io: Client } = require("socket.io-client");
const { Server } = require("socket.io");
const { sendMessage } = require('../../../src/domain/usecases')

describe('send messages', () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('Should send a message with success', (done) => {
    const messages = []
    const message = 'message'
    const msgId = String(Math.random() * 100)

    clientSocket.emit('sendMessage', { author: 'author', message })
    sendMessage(serverSocket, io, messages, msgId)
    clientSocket.on('getMessages', (messages) => {
      expect(messages).toEqual([{ author: 'author', message, id: msgId }])
      done();
    })
  })
})