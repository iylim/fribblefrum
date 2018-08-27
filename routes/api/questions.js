var express = require('express');
var router = express.Router();
var Question = require('../../models/question');
var questionsCtrl = require('../../controllers/questions');

/*---------- Public Routes ----------*/

/*---------- Protected Routes ----------*/

router.get('/', checkAuth, questionsCtrl.index);


/*----- Helper Functions -----*/

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'not authenticated'});
}

module.exports = router; 