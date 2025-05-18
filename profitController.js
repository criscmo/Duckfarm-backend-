const Profit = require('../models/profit');

exports.getUserProfit = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const profits = await Profit.find({ userId }).sort({ date: -1 });
    
    const total = profits.reduce((acc, p) => acc + p.amount, 0);
    
    res.json({
      totalProfit: total,
      recentProfits: profits.slice(0, 10) // return top 10 recent profits
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};