const mongoose = require('mongoose');

const savingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transactions: [
    {
      type: {
        type: String, // 'deposit' or 'withdraw'
        enum: ['deposit', 'withdraw'],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    }
  ],
  balance: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('Saving', savingSchema);