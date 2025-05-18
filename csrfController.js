const axios = require('axios');

exports.getCSRFToken = (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
};

exports.submitForm = async (req, res) => {
  const { userInput, 'g-recaptcha-response': recaptchaResponse } = req.body;
  
  if (!recaptchaResponse) {
    return res.status(400).json({ error: 'reCAPTCHA verification failed' });
  }
  
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    
    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: secretKey,
        response: recaptchaResponse
      }
    });
    
    if (!response.data.success) {
      return res.status(400).json({ error: 'Failed reCAPTCHA verification' });
    }
    
    // Your processing logic here
    res.json({ message: 'Form submitted successfully', userInput });
    
  } catch (err) {
    console.error('reCAPTCHA error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};