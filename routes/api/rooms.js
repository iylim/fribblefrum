var express = require('express');
var router = express.Router();
var Room = require('../../models/room');
var roomsCtrl = require('../../controllers/rooms');
var socket = require('../../controllers/socket');

/*---------- Public Routes ----------*/
router.post('/', roomsCtrl.newRoom);
router.get('/active', roomsCtrl.getRoom);
router.post('/play', roomsCtrl.startGame);
// router.put('/answer', roomsCtrl.)
router.post('/:id', roomsCtrl.joinRoom);

/*---------- Protected Routes ----------*/


module.exports = router;