var socketCtrl = require('./controllers/socket');
var Room = require('./models/room');
var io;

function init(server) {
  io = require('socket.io')(server);

  io.on('connection', function(socket) {
    
    socket.on('register', function(user) {
      socket.user = user;
    });

    socket.on('create-room', function() {
      socketCtrl.newRoom(socket.user).then(room => {
        socket.join(room.id, () => {
          io.to(room.id).emit('update-room', room)
        })       
      })
    });

    socket.on('join-room', function(roomId) {
      socketCtrl.joinRoom(roomId, socket.user).then(room => {
        socket.join(room.id, () => {
          io.to(room.id).emit('update-room', room)
        })       
      })
    });

  });
}

function getIo() {
  return io;
}

module.exports = {
  init, 
  getIo
}