const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'ใส่ชื่อห้อง',
    },
    location: {
        type: String,
        required: true,
        default: 'ใส่ที่ตั้งห้อง',
    },
    status: {
        type: String,
        enum: ['safe', 'detection', 'offline'],
        default: 'safe',
    },
    secretKey: {
        type: String,
        required: true,
    },
      updatedAt: {
        type: Date,
        default: Date.now,
    },
    detectionsToday: {
        type: Number,
        default: 0,
    }
});

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;