const FinancialRecord = require('../models/financialRecord');

// GET all financial records
const getAllRecords = async (req, res) => {
  try {
    const records = await FinancialRecord.find().sort({ date: -1 }); // Sort kwa tarehe mpya juu
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching financial records:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST new financial record
const createRecord = async (req, res) => {
  const { userId, type, amount, status, date, method } = req.body;
  
  if (!userId || !type || !amount || !status || !method) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  
  try {
    const record = new FinancialRecord({
      userId,
      type,
      amount,
      status,
      method,
      date: date || new Date()
    });
    
    await record.save();
    res.status(201).json({ message: 'Record saved successfully', record });
  } catch (error) {
    console.error('Error saving record:', error);
    res.status(500).json({ message: 'Failed to save record' });
  }
};

module.exports = {
  getAllRecords,
  createRecord
};