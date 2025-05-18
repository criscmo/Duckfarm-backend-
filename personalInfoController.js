const PersonalInfo = require('../models/personalInfo');

// Save or Update user info
const updatePersonalInfo = async (req, res) => {
  const { userId, fullName, mobile, wallet, loginPassword, fundPassword } = req.body;
  
  try {
    let user = await PersonalInfo.findOne({ userId });
    
    if (user) {
      // Update
      user.fullName = fullName;
      user.mobile = mobile;
      user.wallet = wallet;
      user.loginPassword = loginPassword;
      user.fundPassword = fundPassword;
      user.updatedAt = new Date();
      await user.save();
    } else {
      // Create new
      user = new PersonalInfo({
        userId,
        fullName,
        mobile,
        wallet,
        loginPassword,
        fundPassword,
      });
      await user.save();
    }
    
    res.status(200).json({ message: 'Taarifa zimehifadhiwa', user });
  } catch (error) {
    console.error('Error saving personal info:', error);
    res.status(500).json({ message: 'Hitilafu ya server' });
  }
};

// Get personal info
const getPersonalInfo = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await PersonalInfo.findOne({ userId });
    
    if (!user) {
      return res.status(404).json({ message: 'Mtumiaji hajapatikana' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Hitilafu ya server' });
  }
};

module.exports = {
  updatePersonalInfo,
  getPersonalInfo
};