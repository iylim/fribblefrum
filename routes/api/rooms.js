var express = require('express');
var router = express.Router();
var Room = require('../../models/room');
var roomsCtrl = require('../../controllers/rooms');
var socket = require('../../controllers/socket');

/*---------- Public Routes ----------*/
router.get('/active', roomsCtrl.getRoom);
router.post('/play', roomsCtrl.startGame);
router.put('/game', roomsCtrl.saveAnswer)
// router.put('/result', roomsCtrl.getAnswers)
router.post('/vote/:promptId', roomsCtrl.vote)
/*---------- Protected Routes ----------*/


module.exports = router;