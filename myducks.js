const mongoose = require('mongoose');

const duckSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: String,
  imageUrl: String,
  level: {
    type: Number,
    default: 1
  },
  dailyIncome: {
    type: Number,
    default: 0
  },
  nextFeedingTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Duck', duckSchema);