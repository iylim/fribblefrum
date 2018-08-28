var Room = require('../models/room');
const io = require('../io').get();

module.exports = {
    newRoom,
    getRoom,
    joinRoom
};

  function newRoom(req, res) {
      var room = new Room(req.body);
      room.players.push({
        userId: req.user._id,
        name: req.user.name
      });
      room.save()
        .then(room => {
          res.json(room);
        })
        .catch(err => res.status(400).json(err));
  }

  function getRoom(req, res) {
    //query for room 
    Room.findOne({'players.userId': req.user._id}).where('status').ne('done').exec()
    .then(room => res.json(room))
    .catch(err => res.status(400).json(err));
  } 

  
  function joinRoom(req, res) {
    Room.findOne({roomId: req.params.id}).then(room => {
      room.players.push({
        userId: req.user._id,
        name: req.user.name
      });
        room.save()
          .then(room => {
            res.json(room);
          })
          .catch(err => res.status(400).json(err));
    });
    }
