const User = require('../models/user');

// Get current user's referral data
exports.getReferralInfo = async (req, res) => {
  try {
    const user = req.user; // Assuming authentication middleware has set req.user
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const populatedUser = await User.findById(user._id).populate('referrals');
    
    res.status(200).json({
      phone: populatedUser.phone,
      referrals: {
        levelA: populatedUser.referrals?.levelA?.length || 0,
        levelB: populatedUser.referrals?.levelB?.length || 0,
        levelC: populatedUser.referrals?.levelC?.length || 0,
      },
      bonus: populatedUser.bonus || 0
    });
  } catch (err) {
    console.error("Referral Fetch Error:", err);
    res.status(500).json({ message: 'Server error' });
  }
};