const Device = require('../models/limit');
const MAX_ACCOUNTS_PER_DEVICE = 2;

exports.checkDeviceLimit = async (req, res) => {
  const { deviceId } = req.params;
  
  try {
    const device = await Device.findOne({ deviceId });
    
    if (!device) {
      return res.json({ limitReached: false, currentAccounts: 0 });
    }
    
    const limitReached = device.accounts.length >= MAX_ACCOUNTS_PER_DEVICE;
    return res.json({
      limitReached,
      currentAccounts: device.accounts.length
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.registerAccount = async (req, res) => {
  const { phone, password, deviceId } = req.body;
  
  if (!deviceId || !phone || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  try {
    let device = await Device.findOne({ deviceId });
    
    if (!device) {
      device = new Device({ deviceId, accounts: [] });
    }
    
    if (device.accounts.length >= MAX_ACCOUNTS_PER_DEVICE) {
      return res.status(403).json({ message: 'Account limit reached for this device' });
    }
    
    device.accounts.push({ phone });
    await device.save();
    
    return res.status(201).json({ message: 'Account registered successfully' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};