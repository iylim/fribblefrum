var Room = require('../models/room');

module.exports = {
    newRoom,
    get
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
    if (req.params.id > 14) {
      Room.findById(req.params.id).populate({path: 'players'}).then(room => {
        res.json(room);
      })
      .catch(err => res.status(400).json(err));
    } else {
      Room.findOne({roomId: req.params.id}).populate({path: 'players'}).then(room => {
        res.json(room);
      })
      .catch(err => res.status(400).json(err));
    }
  }
