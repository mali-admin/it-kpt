const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}