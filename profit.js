const mongoose = require('mongoose');

const profitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['daily', 'bonus', 'referral'], default: 'daily' }
});

module.exports = mongoose.model('Profit', profitSchema);