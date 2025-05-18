const { checkEnvelopeCode, getWinners } = require('./envelope');

const handleEnvelopeSubmission = async (req, res) => {
  const { code } = req.body;
  
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ success: false, message: "Invalid input." });
  }
  
  try {
    const result = await checkEnvelopeCode(code.trim());
    res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    console.error('Envelope Error:', err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

const handleGetWinners = async (req, res) => {
  try {
    const winners = await getWinners();
    res.status(200).json(winners);
  } catch (err) {
    console.error('Winners Fetch Error:', err);
    res.status(500).json([]);
  }
};

module.exports = { handleEnvelopeSubmission, handleGetWinners };