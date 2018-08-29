var Question = require('../models/question');

module.exports = {
   index
};

function index(req, res) {
    Question.find({})
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json(err));
} 


