const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  wallet: {
    type: String,
    required: true
  },
  loginPassword: {
    type: String,
    required: true
  },
  fundPassword: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('PersonalInfo', personalInfoSchema);