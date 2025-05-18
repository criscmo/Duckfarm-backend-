const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Import Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const rechargeRoutes = require('./routes/rechargeRoutes');
const adminRoutes = require('./routes/adminRoutes');
const profileRoutes = require('./routes/profileRoutes');
const MyducksRoutes = require('./routes/MyduckRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const customerServiceRoutes = require('./routes/customerServiceRoutes');
const referralRoutes = require('./routes/referralRoutes');
const limitRoutes = require('./routes/limitRoutes');
const savingsRoutes = require('./routes/savingsRoutes');
const spinRoutes = require('./routes/spinRoutes');
const envelopeRoutes = require('./routes/envelopeRoutes');
const metaRoutes = require('./routes/metaTagsRoutes');
const personalInfoRoutes = require('./routes/personalInfoRoutes');
const financialRecordRoutes = require('./routes/financialRecordRoutes');
const csrfRoutes = require('./routes/csrfRoutes');
const adminDashboardRoutes = require('./routes/adminDashboardRoutes');

// Apply Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/withdraw', withdrawRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/recharge', rechargeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/myducks', MyducksRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/customer-service', customerServiceRoutes);
app.use('/api/referral', referralRoutes);
app.use('/api/limit', limitRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/spin', spinRoutes);
app.use('/api/envelope', envelopeRoutes);
app.use('/api/meta', metaRoutes);
app.use('/api/personal-info', personalInfoRoutes);
app.use('/api/financial-records', financialRecordRoutes);
app.use('/api/adminDashboard', adminDashboardRoutes);
app.use('/api/csrf', csrfRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Error Handling Middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));