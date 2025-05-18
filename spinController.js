const Spin = require('../models/spin');

const getAccount = async (req, res) => {
  const userId = req.user.id;
  
  let account = await SpinWheel.findOne({ userId });
  if (!account) {
    account = new SpinWheel({ userId });
    await account.save();
  }
  
  res.json(account);
};

const playSpin = async (req, res) => {
  const userId = req.user.id;
  const spinCost = 5200;
  
  const account = await SpinWheel.findOne({ userId });
  if (!account || account.spinCount <= 0) {
    return res.status(400).json({ error: 'No spins left. Please recharge.' });
  }
  
  // Deduct spin
  account.spinBalance -= spinCost;
  account.spinCount--;
  
  // Calculate reward based on round
  let reward = 0;
  const round = account.round;
  if (round === 1) reward = 5000;
  else if ([2, 3, 4].includes(round)) reward = 7000;
  else if ([5, 6].includes(round)) reward = 1200;
  else {
    const cycle = (round - 1) % 6 + 1;
    reward = cycle === 1 ? 5000 : (cycle <= 4 ? 7000 : 1200);
  }
  
  account.spinBalance += reward;
  account.history.push({ reward });
  account.round += 1;
  
  await account.save();
  
  res.json({
    reward,
    newSpinBalance: account.spinBalance,
    mainBalance: account.mainBalance,
    spinCount: account.spinCount,
    round: account.round
  });
};

module.exports = {
  getAccount,
  playSpin
};