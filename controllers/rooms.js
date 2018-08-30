var Room = require('../models/room');
var Question = require('../models/question');
var io = require('../io').getIo();

module.exports = {
    getRoom,
    startGame,
    saveAnswer,
    getVotes,
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

function playAgain(req, res) {
  Room.findOne({'players.userId': req.user._id, status: 'done'}).exec()
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
    // room.answerNeeded = req.body.answerNeeded -2;  
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

function getVotes(req, res) {
  //set status to results
}
// Room.findOne({'players.prompts._id': promptId}).then(room =>
// var prompt = prompts.id(id...)

//getResults(req, res) {
//total votes to user?
//set game status to done
// }


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

