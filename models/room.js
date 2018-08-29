var mongoose = require('mongoose');
var shortid = require('shortid');

var playerSchema = new mongoose.Schema({
  userId: String,
  name: String,
  done: {type: Boolean, default: false},
  prompt: [{
    question: String,
    answer: String,
    votes: 0
  }]

});

var roomSchema = new mongoose.Schema({
    roomId: {type: String, default: shortid.generate},
    players: [playerSchema],
    status: {type: String, enum:['playing', 'waiting', 'voting', 'results', 'done'], default: 'waiting'},
    questions: [] 
}, {
    timestamps: true
  });

  roomSchema.set('toJSON', {
    transform: function(doc, ret) {
      return ret;
    }
  });

module.exports = mongoose.model('Room', roomSchema);