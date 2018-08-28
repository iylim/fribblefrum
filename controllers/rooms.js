var Room = require('../models/room');
var io = require('../io').getIo();

module.exports = {
    newRoom,
    getRoom,
    joinRoom,
    startGame
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
      //if player is not already in the players array
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

  function startGame(req, res) {
    Room.findOne({'players.userId': req.user._id, status: 'waiting'}).exec()
    .then(room => {
      room.status = 'playing';
      room.save().then(room => {
        io.to(room.id).emit('update-room', room);
        res.status(200).json({});
      });
    })
    .catch(err => res.status(400).json(err));
  }


