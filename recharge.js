const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  network: { type: String, required: true },
  amount: { type: Number, required: true },
  screenshotUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recharge', rechargeSchema);