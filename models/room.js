var mongoose = require('mongoose');
var shortid = require('shortid');

var roomSchema = new mongoose.Schema({
    roomId: {type: String, default: shortid.generate},
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
}, {
    timestamps: true
  });

  roomSchema.set('toJSON', {
    transform: function(doc, ret) {
      return ret;
    }
  });

module.exports = mongoose.model('Room', roomSchema);