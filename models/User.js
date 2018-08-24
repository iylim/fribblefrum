var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: '',
    gamesPlayed: 0,
    wins: 0
  }, {
    timestamps: true
  });


module.exports = mongoose.model('User', userSchema);