var mongoose = require('mongoose');
var shortid = require('shortid');

var promptSchema = new mongoose.Schema({
  question: String,
  answer: {type: String, default: ''},
  votes: [{type: mongoose.Schema.Types.ObjectId}]
});

var playerSchema = new mongoose.Schema({
  userId: String,
  name: String,
  prompts: [promptSchema]
});

var roomSchema = new mongoose.Schema({
  roomId: {type: String, default: shortid.generate},
  players: [playerSchema],
  status: {type: String, enum:['playing', 'waiting', 'voting', 'results', 'done'], default: 'waiting'},
  questions: [String]
}, {
  timestamps: true
});

roomSchema.set('toJSON', {
  transform: function(doc, ret) {
    return ret;
  }
});

module.exports = mongoose.model('Room', roomSchema);