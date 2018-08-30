var mongoose = require('mongoose');
var shortid = require('shortid');

var promptSchema = new mongoose.Schema({
  question: String,
  answer: {type: String, default: ''},
  votes: {type: Number, default: 0},
});

var playerSchema = new mongoose.Schema({
  userId: String,
  name: String,
  done: {type: Boolean, default: false},
  prompts: [promptSchema]
});

var roomSchema = new mongoose.Schema({
  roomId: {type: String, default: shortid.generate},
  players: [playerSchema],
  status: {type: String, enum:['playing', 'waiting', 'voting', 'results', 'done'], default: 'waiting'},
  questions: [String],
  answerNeeded: Number
}, {
  timestamps: true
});

roomSchema.set('toJSON', {
  transform: function(doc, ret) {
    return ret;
  }
});

module.exports = mongoose.model('Room', roomSchema);