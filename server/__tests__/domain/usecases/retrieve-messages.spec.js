const { createServer } = require("http")
const { io: Client } = require("socket.io-client");
const { Server } = require("socket.io");
const { retrieveMessages } = require('../../../src/domain/usecases')

describe('retrieve messages from chat', () => {
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

  it('Should return all messages', (done) => {
    const messages = [{ author: 'username', message: 'message', id: 'id' }]
    clientSocket.on('getMessages', (messages) => {
      console.log(messages)
      expect(messages)
        .toEqual([{ author: 'username', message: 'message', id: 'id' }])
      done();
    })
    retrieveMessages(serverSocket, messages)
    clientSocket.emit('retrieveImages', {})
  })
})