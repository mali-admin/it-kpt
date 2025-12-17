const Log = require('../models/Log');

exports.createLog = async (req, res) => {
    try {
        const { secretKey, status} = req.body;
        if (!secretKey || !status) {
            return res.status(400).json({ message: 'Secret key and status are required' });
        }
        const newLog = new Log({ secretKey, status });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};