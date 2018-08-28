var Room = require('../models/room');

function newRoom(user) {
  return new Promise(function(resolve) {
    var room = new Room();
    room.players.push({
      userId: user._id,
      name: user.name
    });
    room.save()
      .then(room => {
        resolve(room);
      })
      .catch(err => res.status(400).json(err));
  }); 
}

function joinRoom(roomI, user) {
  return new Promise(function(resolve) {
  var room = Room.findOne({roomId: roomI}).then(room => {
    room.players.push({
      userId: user._id,
      name: user.name
    });
    room.save()
      .then(room => {
        resolve(room);
      })
      .catch(err => res.status(400).json(err));
  });
})
} 


module.exports = {
    newRoom,
    joinRoom
}