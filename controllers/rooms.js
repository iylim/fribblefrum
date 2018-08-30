var Room = require('../models/room');
var Question = require('../models/question');
var io = require('../io').getIo();

module.exports = {
    getRoom,
    startGame,
    saveAnswer
};

function getRoom(req, res) {
  //query for room 
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
  Room.findOne({'players.userId': req.user._id}).then(room => {
    var player = room.players.find(p => p.userId === req.user._id);
    player.prompts.forEach((p,i) => 
      p.answer = (i===0) ? req.body.answer1 : req.body.answer2);
    room.save().then(room => {
      io.to(room.id).emit('update-room', room);
      res.status(200).json({});
    });
  });
}
//voting
//fetch to post io.to room to update after each
//getResults
// query room based on prompt id
// Room.findOne({'players.prompts._id': promptId}).then(room =>
// var prompt = prompts.id(id...)
//everylogged in user is answering their own questions
//find correct prompt to player access user


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

