var express = require('express');
var router = express.Router();
var Room = require('../../models/room');
var roomsCtrl = require('../../controllers/rooms');

/*---------- Public Routes ----------*/
router.post('/', roomsCtrl.newRoom);
router.get('/:id', roomsCtrl.get);
router.post('/:id', roomsCtrl.joinRoom);
/*---------- Protected Routes ----------*/


module.exports = router;