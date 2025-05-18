const Withdraw = require('../models/withdraw');
const User = require('../models/user');

exports.requestWithdraw = async (req, res) => {
  try {
    const { phone, network, amount, fundPassword } = req.body;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    
    if (!user || user.fundPassword !== fundPassword) {
      return res.status(401).json({ message: 'Nenosiri la fedha si sahihi.' });
    }
    
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Salio halitoshi.' });
    }
    
    const fee = Math.floor(amount * 0.10);
    const totalDeduction = amount;
    
    user.balance -= totalDeduction;
    await user.save();
    
    const withdraw = new Withdraw({
      userId,
      phone,
      network,
      amount,
      fee
    });
    
    await withdraw.save();
    
    res.status(201).json({ message: 'Ombi la kutoa fedha limewasilishwa.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Hitilafu ya ndani ya seva.' });
  }
};

exports.getMyWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdraw.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(withdrawals);
  } catch (err) {
    res.status(500).json({ message: 'Hitilafu ya kupata taarifa.' });
  }
};