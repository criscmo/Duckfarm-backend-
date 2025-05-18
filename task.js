// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  planId: { type: String, required: true },
  feedCount: { type: Number, default: 0 },
  lastFedDate: { type: String }, // format: 'YYYY-MM-DD'
});

taskSchema.index({ userId: 1, planId: 1 }, { unique: true });

module.exports = mongoose.model('Task', taskSchema);