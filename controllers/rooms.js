var Room = require('../models/room');
var Question = require('../models/question');
var io = require('../io').getIo();

module.exports = {
    newRoom,
    getRoom,
    joinRoom,
    startGame,
    getQuestions
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
    //add functionality to see if player is already in the players array 
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
    getQuestions(room.players.length)
    .then(questions => {
      room.questions = questions;  
//map players index with 2 prompts add 2 objects
 



      room.save().then(room => {
        io.to(room.id).emit('update-room', room);
        res.status(200).json({});
      });
    });
  })
  .catch(err => res.status(400).json(err));
}


/*----- Gameplay Functions -----*/

//voting

//getResults



/*----- Helper Functions -----*/
function getQuestions(numPlayers) {
  return Question.find({})
  .then(questions => { 
    return getGameQuestions(questions, numPlayers);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getGameQuestions(questions, numPlayers) {
  shuffleArray(questions);
  return questions.splice(0, numPlayers).map(q => q.question);
}

