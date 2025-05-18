const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  password: { type: String, required: true }, // hashed password
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);