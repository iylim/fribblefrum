var Room = require('../models/room');
var Question = require('../models/question');
var io = require('../io').getIo();

module.exports = {
  getRoom,
  startGame,
  saveAnswer,
  voting,
  getResults,
  playAgain
};

function getRoom(req, res) {
  Room.findOne({'players.userId': req.user._id}).where('status').ne('done').exec()
  .then(room => res.json(room))
  .catch(err => res.status(400).json(err));
} 

function startGame(req, res) {
  Room.findOne({'players.userId': req.user._id, status: 'waiting'}).exec()
  .then(room => {
    room.status = 'playing';
    getQuestions(room.players.length)
    .then(questions => {
      room.questions = questions;
      var prompts = generatePrompts(questions);
      prompts.forEach((prompt, i) => {
        prompt.forEach(p => {
          room.players[i].prompts.push({question: p}); 
        });
      });
      room.save().then(room => {
        io.to(room.id).emit('update-room', room);
        res.status(200).json({});
      });
    });
  })
  .catch(err => res.status(400).json(err));
}

/*----- Gameplay Functions -----*/

function saveAnswer(req, res) {
  Room.findOne({'players.userId': req.user._id, status: 'playing'}).then(room => {
    var player = room.players.find(p => p.userId === req.user._id);
    player.prompts[0].answer = req.body.answer1;
    player.prompts[1].answer = req.body.answer2;
    if (room.players.every(p => p.prompts[0].answer)) room.status = 'voting';
    room.save().then(room => {
      io.to(room.id).emit('update-room', room);
      res.status(200).json({});
    });
  });
}

function voting(req, res) {
  Room.findOne({'players.userId': req.user._id, status: 'voting'}).then(room => {
    var player = room.players.find(p => p.prompts.id(req.params.promptId));
    var prompt = player.prompts.id(req.params.promptId);
    prompt.votes.push(req.user._id);
    var totalVotes = 0;
    room.players.forEach(p => {
      totalVotes += p.prompts[0].votes.length;
      totalVotes += p.prompts[1].votes.length;
    });
    if (totalVotes === (room.players.length - 2) * room.players.length) room.status = 'results';
    room.save().then(room => {
      io.to(room.id).emit('update-room', room);
      res.status(200).json({});
    });
  });
}

function getResults(req, res) {
//total votes to user?
//room.status = 'done';
//if players leave room remove from room players array
}

function playAgain(req, res) {
  Room.findOne({'players.userId': req.user._id, roomId: req.body.roomId}).exec()
  .then(room => {
    room.status = 'waiting';
    if (2 < room.players.length < 9)
    startGame();
  room.save().then(room => {
      io.to(room.id).emit('update-room', room);
      res.status(200).json({});
    });
  });
} 

/*----- Helper Functions -----*/

function generatePrompts(questions) {
  // return an array of arrays, where the inner arrays have two prompt objects
  var lastIdx = questions.length - 1;
  return questions.map((q, i) => {
    return [q, i === lastIdx ? questions[0] : questions[i + 1]];
  });
}

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

