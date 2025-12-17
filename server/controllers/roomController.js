const Room = require('../models/Room')

exports.createRoom = async (req, res) => {
    try {
        const { secretKey } = req.body

        if (!secretKey) {
            return res.status(400).json({ message: 'secretKey is required' })
        }

        let room = await Room.findOne({ secretKey })

        if (room) {
            return res.status(200).json({
                message: 'Room already exists',
                room
            })
        }

        room = new Room({
            secretKey,
            name: "ใส้้ชื่อห้อง",
            location: "ใส่ที่ตั้งห้อง",
            status: "safe"
        })

        await room.save()
        return res.status(201).json({
            message: 'Room created successfully',
            room
        })

    } catch (error) {
        console.error('Create room error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find()
        res.json({ rooms })
    } catch (error) {
        console.error('Get rooms error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.updateRoom = async (req, res) => {
    try {
        const { name, location } = req.body;
        const { id } = req.params;

        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        if (name) room.name = name;
        if (location) room.location = location;
        room.updatedAt = Date.now();

        await room.save();

        res.json(room);

    } catch (error) {
        console.error('Update room error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateRoomStatus = async (req, res) => {
    try {
        const { secretKey, status } = req.body

        const room = await Room.findOne({ secretKey })
        if (!room) {
            return res.status(404).json({ message: 'Room not found' })
        }
        if (status === 'detection') {
            room.updatedAt = Date.now();
        }
        room.status = status
        await room.save()

        res.json(room)

    } catch (error) {
        console.error('Update room status error:', error)
        res.status(500).json({ message: 'Server error' })
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findByIdAndDelete(id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted successfully' });
    } catch (error) {
        console.error('Delete room error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};