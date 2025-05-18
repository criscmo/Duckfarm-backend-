const nodemailer = require('nodemailer');
require('dotenv').config();

const sendCustomerMessage = async (email, message) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  const mailOptions = {
    from: `"DuckFarm Customer" <${process.env.SMTP_USER}>`,
    to: process.env.SUPPORT_RECEIVER,
    subject: `Customer Service Message from ${email}`,
    text: message
  };
  
  return await transporter.sendMail(mailOptions);
};

module.exports = { sendCustomerMessage };