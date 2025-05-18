const Task = require('../models/task');
const User = require('../models/user');

const plans = {
  intern: { feedLimit: 5, dailyProfit: 900 },
  l1: { feedLimit: 7, dailyProfit: 642.86 },
  l2: { feedLimit: 15, dailyProfit: 600 },
  l3: { feedLimit: 30, dailyProfit: 600 },
  l4: { feedLimit: 45, dailyProfit: 1000 },
  l5: { feedLimit: 40, dailyProfit: 1912.5 },
  l6: { feedLimit: 45, dailyProfit: 3500 },
  l7: { feedLimit: 60, dailyProfit: 4950 },
  l8: { feedLimit: 60, dailyProfit: 9000 }
};

const doTask = async (req, res) => {
  const userId = req.user.id;
  const { planId } = req.body;
  
  const today = new Date().toISOString().split('T')[0];
  const plan = plans[planId];
  if (!plan) return res.status(400).json({ error: 'Invalid plan ID' });
  
  let task = await Task.findOne({ userId, planId });
  if (!task) {
    task = new Task({ userId, planId });
  }
  
  if (task.lastFedDate === today) {
    return res.status(400).json({ error: 'Already fed today' });
  }
  
  if (task.feedCount >= plan.feedLimit) {
    return res.status(400).json({ error: 'Feeding limit reached' });
  }
  
  task.feedCount += 1;
  task.lastFedDate = today;
  await task.save();
  
  const user = await User.findById(userId);
  user.balance += plan.dailyProfit;
  await user.save();
  
  res.json({
    message: `Fed successfully. Earned Tzs ${plan.dailyProfit}`,
    newBalance: user.balance,
    feedCount: task.feedCount
  });
};

const getTaskStatus = async (req, res) => {
  const userId = req.user.id;
  const { planId } = req.params;
  
  const task = await Task.findOne({ userId, planId });
  res.json(task || { feedCount: 0, lastFedDate: null });
};

module.exports = {
  doTask,
  getTaskStatus
};