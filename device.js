const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  fingerprint: { type: String, unique: true },
  accountCount: { type: Number, default: 1 },
});

module.exports = mongoose.model("Device", deviceSchema);