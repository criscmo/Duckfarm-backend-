const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['withdraw', 'recharge', 'bonus', 'transfer'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  network: {
    type: String,
    enum: ['halopesa', 'mpesa', 'tigopesa', 'airtel', 'bank', 'system'],
    default: 'system'
  },
  status: {
    type: String,
    enum: ['success', 'pending', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);