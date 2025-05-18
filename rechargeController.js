const Recharge = require('../models/recharge');

// Create recharge
exports.createRecharge = async (req, res) => {
  try {
    const { phone, network, amount } = req.body;
    if (!req.file) return res.status(400).json({ message: 'Screenshot is required.' });
    
    const newRecharge = new Recharge({
      phone,
      network,
      amount,
      screenshotUrl: `/uploads/screenshots/${req.file.filename}`,
    });
    
    await newRecharge.save();
    res.status(201).json({ message: 'Recharge submitted successfully.' });
  } catch (err) {
    console.error('Create Error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Get all recharges
exports.getRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find().sort({ createdAt: -1 });
    res.status(200).json(recharges);
  } catch (err) {
    console.error('Get Error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Update recharge status
exports.updateRechargeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const recharge = await Recharge.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!recharge) {
      return res.status(404).json({ message: 'Recharge not found.' });
    }
    
    res.status(200).json(recharge);
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
};