var Room = require('../models/room');

module.exports = {
    newRoom,
    get,
    joinRoom
};

  function newRoom(req, res) {
      var room = new Room(req.body);
      room.players.push(req.user._id);
      room.save()
        .then(room => {
          res.json(room);
        })
        .catch(err => res.status(400).json(err));
  }

  function get(req, res) {
    Room.findById(req.params.id).populate({path: 'players'}).then(room => {
      res.json(room);
    })
    .catch(err => res.status(400).json(err));
  } 

  
  function joinRoom(req, res) {
    Room.findOne({roomId: req.params.id}).then(room => {
      room.players.push(req.user._id);
        room.save()//.populate({path: 'players'})
          .then(room => {
            res.json(room);
          })
          .catch(err => res.status(400).json(err));
    });
    }
