var io;

function init(server) {
  io = require('socket.io')(server);

  io.on('connection', function(){
    console.log('a user connected to socket.io');
  });
}

function get() {
  return io;
}

module.exports = {
  init, 
  get
}