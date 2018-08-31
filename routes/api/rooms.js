var express = require('express');
var router = express.Router();
var Room = require('../../models/room');
var roomsCtrl = require('../../controllers/rooms');
var socket = require('../../controllers/socket');

/*---------- Public Routes ----------*/
router.put('/game', roomsCtrl.saveAnswer);

/*---------- Protected Routes ----------*/
router.get('/active', roomsCtrl.getRoom);
router.put('/play', roomsCtrl.startGame);
router.post('/result', roomsCtrl.getResults);
router.post('/vote/:promptId', roomsCtrl.voting);
router.put('/playAgain', roomsCtrl.playAgain)

module.exports = router;