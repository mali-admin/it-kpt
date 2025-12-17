const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    secretKey: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['safe', 'detection', 'offline'],
        default: 'safe',
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;