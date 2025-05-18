const User = require('../models/User');
const Recharge = require('../models/Recharge');
const Withdraw = require('../models/Withdraw');
const Record = require('../models/FinancialRecord');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    let html = `<table><tr><th>User</th><th>Balance</th></tr>`;
    users.forEach(u => {
      html += `<tr><td>${u.name}</td><td>${u.balance}</td></tr>`;
    });
    html += `</table>`;
    res.json({ html });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find().lean();
    let html = `<table><tr><th>User</th><th>Amount</th><th>Status</th><th>Actions</th></tr>`;
    recharges.forEach(r => {
      html += `<tr>
        <td>${r.user}</td>
        <td>${r.amount}</td>
        <td>${r.status}</td>
        <td>
          <button class="action-btn approve-btn" onclick="handleAction(this, 'approved')">Approve</button>
          <button class="action-btn reject-btn" onclick="handleAction(this, 'rejected')">Reject</button>
        </td>
      </tr>`;
    });
    html += `</table>`;
    res.json({ html });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getWithdraws = async (req, res) => {
  try {
    const withdraws = await Withdraw.find().lean();
    let html = `<table><tr><th>User</th><th>Amount</th><th>Status</th><th>Actions</th></tr>`;
    withdraws.forEach(w => {
      html += `<tr>
        <td>${w.user}</td>
        <td>${w.amount}</td>
        <td>${w.status}</td>
        <td>
          <button class="action-btn approve-btn" onclick="handleAction(this, 'approved')">Approve</button>
          <button class="action-btn reject-btn" onclick="handleAction(this, 'rejected')">Reject</button>
        </td>
      </tr>`;
    });
    html += `</table>`;
    res.json({ html });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find().lean();
    let html = `<table><tr><th>User</th><th>Type</th><th>Amount</th><th>Date</th></tr>`;
    records.forEach(r => {
      html += `<tr><td>${r.user}</td><td>${r.type}</td><td>${r.amount}</td><td>${r.date}</td></tr>`;
    });
    html += `</table>`;
    res.json({ html });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.handleAction = async (req, res) => {
  try {
    const { user, amount, status } = req.body;
    
    // Hapa unaweza weka logic ya kurekodi au kubadili status ya recharge/withdraw
    if (status === 'approved') {
      // mfano: update status in DB
    }
    
    res.status(200).json({ message: 'Action completed' });
  } catch (err) {
    res.status(500).json({ message: 'Action error' });
  }
};