var express = require('express');
var router = express.Router();
var Room = require('../../models/room');
var roomsCtrl = require('../../controllers/rooms');

/*---------- Public Routes ----------*/
router.post('/:id', roomsCtrl.newRoom);
router.get('/:id', roomsCtrl.get);
/*---------- Protected Routes ----------*/


module.exports = router;