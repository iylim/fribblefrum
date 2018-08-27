//push player id into players array
//return room, reroute

var Room = require('../models/room');

module.exports = {
    newRoom,
    get
};

function newRoom(req, res) {
    var room = new Room(req.body);
    console.log(req.user);
    room.save()
      .then(room => {
        res.json(room);
      })
      .catch(err => res.status(400).json(err));
  }

  function get(req, res) {
    var user = req.user.id;
    console.log(user);
  }
