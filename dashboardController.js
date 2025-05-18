const getUserBalance = async (req, res) => {
  const { userId } = req.params;
  
  try {
    // Simulated user balance, replace with DB logic later
    const balances = {
      user123: 3500,
      user456: 10000
    };
    
    const balance = balances[userId] || 0;
    res.status(200).json({ balance });
  } catch (error) {
    console.error('Failed to fetch balance:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = {
  getUserBalance
};