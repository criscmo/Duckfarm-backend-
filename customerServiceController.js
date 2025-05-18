const { sendCustomerMessage } = require('./customerservice');

const handleCustomerContact = async (req, res) => {
  try {
    const { email, message } = req.body;
    
    if (!email || !message) {
      return res.status(400).json({ success: false, message: 'Email and message are required.' });
    }
    
    await sendCustomerMessage(email, message);
    
    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Customer Service Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

module.exports = { handleCustomerContact };