const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { username, phone, password, fingerprint } = req.body;
    if (!username || !phone || !password || !fingerprint) {
      return res.status(400).json({ message: 'Tafadhali jaza taarifa zote' });
    }
    
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'Namba ya simu tayari imesajiliwa' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, phone, password: hashedPassword, fingerprint });
    await user.save();
    
    res.status(201).json({ message: 'Akaunti imeundwa kikamilifu' });
  } catch (error) {
    res.status(500).json({ message: 'Hitilafu kwenye server', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json({ message: 'Akaunti haipo' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Nenosiri si sahihi' });
    }
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({
      message: 'Umefanikiwa kuingia',
      token,
      user: {
        id: user._id,
        username: user.username,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Hitilafu kwenye server', error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -fingerprint');
    if (!user) {
      return res.status(404).json({ message: 'Mtumiaji hakupatikana' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Hitilafu kwenye server' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Mtumiaji hakupatikana' });
    }
    
    if (username) user.username = username;
    await user.save();
    
    res.status(200).json({ message: 'Taarifa zimeboreshwa' });
  } catch (error) {
    res.status(500).json({ message: 'Hitilafu kwenye server' });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateUser
};