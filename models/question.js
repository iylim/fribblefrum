var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
question: String,
}, {
    timestamps: true
  });

module.exports = mongoose.model('Question', questionSchema); 