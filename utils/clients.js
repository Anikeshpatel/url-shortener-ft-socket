const socketio = require('socket.io');

let io
const clients = {}


module.exports = {
  init: (http) => {
    io = socketio(http)

    io.on('connection', function(socket) {
      console.log('DEBUG connected', socket.id);
      clients[socket.id] = socket;
      socket.join(socket.id);
        
      socket.on('disconnect', function () {
         delete clients[socket.id]
      });
    });
  },
  sendResTo: (clientId, res) => {
    const client = clients[clientId]
    if (!client) {
      return
    }

    io.in(clientId).emit('response', JSON.stringify(res))
  }
}
