const express = require('express');
const { getRooms, createRoom ,updateRoomStatus,updateRoom,deleteRoom} = require('../controllers/roomController');
const router = express.Router();

router.get('/room/', getRooms);
router.post('/room/', createRoom);
router.put('/room/:id',updateRoom)
router.delete('/room/:id', deleteRoom);
router.put('/room/status', updateRoomStatus);

module.exports = router;