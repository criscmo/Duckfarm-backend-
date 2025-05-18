const User = require('../models/user');

// Function to handle referral logic when user signs up
const handleReferral = async (referrerCode, newUserId) => {
  try {
    const referrerPhone = Buffer.from(referrerCode, 'base64').toString('utf-8');
    const referrer = await User.findOne({ phone: referrerPhone });
    
    if (!referrer) return;
    
    // Add to level A
    referrer.referrals.levelA.push(newUserId);
    await referrer.save();
    
    // Bonus for level A referrer
    referrer.bonus = (referrer.bonus || 0) + 1000;
    await referrer.save();
    
    // Look for level B referrer (referrer’s referrer)
    const refLevelB = await User.findOne({
      'referrals.levelA': referrer._id
    });
    
    if (refLevelB) {
      refLevelB.referrals.levelB.push(newUserId);
      refLevelB.bonus = (refLevelB.bonus || 0) + 500;
      await refLevelB.save();
    }
    
    // Look for level C referrer (refLevelB's referrer)
    const refLevelC = await User.findOne({
      'referrals.levelA': refLevelB?._id
    });
    
    if (refLevelC) {
      refLevelC.referrals.levelC.push(newUserId);
      refLevelC.bonus = (refLevelC.bonus || 0) + 250;
      await refLevelC.save();
    }
  } catch (error) {
    console.error("Referral system error:", error);
  }
};

module.exports = { handleReferral };