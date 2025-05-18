const Duck = require('./myducks');

// GET all ducks for a user
exports.getUserDucks = async (req, res) => {
  try {
    const { userId } = req.params;
    const ducks = await Duck.find({ userId });
    res.status(200).json(ducks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ducks' });
  }
};

// POST feed a duck
exports.feedDuck = async (req, res) => {
  try {
    const { duckId } = req.params;
    const { userId } = req.body;
    
    const duck = await Duck.findOne({ _id: duckId, userId });
    if (!duck) {
      return res.status(404).json({ error: 'Duck not found' });
    }
    
    const now = new Date();
    const canFeed = !duck.nextFeedingTime || now >= new Date(duck.nextFeedingTime);
    
    if (!canFeed) {
      return res.status(400).json({ error: 'Duck already fed recently' });
    }
    
    const earnedAmount = duck.dailyIncome || 0;
    duck.nextFeedingTime = new Date(now.getTime() + 4 * 60 * 60 * 1000); // Next feeding in 4 hours
    await duck.save();
    
    res.status(200).json({ message: 'Duck fed', earnedAmount });
  } catch (err) {
    res.status(500).json({ error: 'Failed to feed duck' });
  }
};