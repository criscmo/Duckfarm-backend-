const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fingerprint: { type: String, required: true },
  balance: { type: Number, default: 0 },
  joinedPlans: {
    type: Map,
    of: Number,
    default: {} // mfano: { "l1": 1, "intern": 1 }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);