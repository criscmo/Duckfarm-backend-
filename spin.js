const mongoose = require('mongoose');

const spinlSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  spinBalance: {
    type: Number,
    default: 0
  },
  mainBalance: {
    type: Number,
    default: 0
  },
  spinCount: {
    type: Number,
    default: 0
  },
  round: {
    type: Number,
    default: 1
  },
  history: [
    {
      reward: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = mongoose.model('Spin', spinSchema);