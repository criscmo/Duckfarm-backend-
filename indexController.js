const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { phone, password, verificationCode, invitationCode } = req.body;
  
  if (!phone || !password || !verificationCode || !invitationCode) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  
  try {
    const userExists = await User.findOne({ phone });
    if (userExists) {
      return res.status(400).json({ message: 'Phone number already registered.' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
      phone,
      password: hashedPassword,
      verificationCode,
      invitationCode
    });
    
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
    
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

module.exports = { registerUser };