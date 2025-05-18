const Saving = require('../models/saving');

exports.getUserSavings = async (req, res) => {
  try {
    const userId = req.user.id;
    let saving = await Saving.findOne({ user: userId });
    
    if (!saving) {
      saving = new Saving({ user: userId });
      await saving.save();
    }
    
    res.json({
      balance: saving.balance,
      transactions: saving.transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.depositToSavings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;
    
    let saving = await Saving.findOne({ user: userId });
    if (!saving) {
      saving = new Saving({ user: userId });
    }
    
    saving.transactions.unshift({ type: 'deposit', amount });
    saving.balance += amount;
    
    await saving.save();
    res.json({ message: 'Deposit successful', balance: saving.balance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.withdrawFromSavings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { amount } = req.body;
    
    let saving = await Saving.findOne({ user: userId });
    
    if (!saving || saving.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    saving.transactions.unshift({ type: 'withdraw', amount });
    saving.balance -= amount;
    
    await saving.save();
    res.json({ message: 'Withdraw successful', balance: saving.balance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};