const User = require('../models/profile');

// Get user balance
exports.getBalance = async (req, res) => {
  try {
    const userId = req.user.id; // From authentication middleware
    const user = await User.findById(userId).select('balance');
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({ balance: user.balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // For JWT: client clears token from local storage/cookies
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed' });
  }
};