// controllers/adminController.js

const Recharge = require('../models/Recharge');
const Withdraw = require('../models/Withdraw');
const Record = require('../models/FinancialRecord');

exports.getTransactions = async (req, res) => {
  try {
    const recharges = await Recharge.find().lean();
    const withdraws = await Withdraw.find().lean();
    const records = await Record.find().lean();

    const allData = [
      ...recharges.map(r => ({
        user: r.user,
        amount: r.amount,
        type: 'Recharge',
        status: r.status,
        date: r.date
      })),
      ...withdraws.map(w => ({
        user: w.user,
        amount: w.amount,
        type: 'Withdraw',
        status: w.status,
        date: w.date
      })),
      ...records.map(rec => ({
        user: rec.user,
        amount: rec.amount,
        type: rec.type,
        status: rec.status || '',
        date: rec.date
      }))
    ];

    res.json(allData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTransaction = async (req, res) => {
  const { user, amount, type, status } = req.body;
  try {
    let model;
    if (type === 'Recharge') model = Recharge;
    else if (type === 'Withdraw') model = Withdraw;
    else return res.status(400).json({ message: 'Invalid type' });

    const tx = await model.findOneAndUpdate(
      { user, amount },
      { status },
      { new: true }
    );

    if (!tx) return res.status(404).json({ message: 'Transaction not found' });

    res.json({ message: 'Transaction updated', tx });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update error' });
  }
};