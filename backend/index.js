const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const authRoutes = require('./src/routes/auth');
const crateRoutes = require('./src/routes/crates');
const scanRoutes = require('./src/routes/scans');
const tripRoutes = require('./src/routes/trips');
const reportRoutes = require('./src/routes/reports'); // New Reports Route 

// Import Cron Job
require('./src/cron/reconcile'); // Automated 11:59 PM check [cite: 79, 80]

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Route Registrations [cite: 51, 52]
app.use('/auth', authRoutes);       // Login and JWT 
app.use('/crates', crateRoutes);     // Generation and Printing 
app.use('/scans', scanRoutes);       // Mobile Bulk Sync [cite: 52, 63]
app.use('/trips', tripRoutes);       // Trip Management 
app.use('/reports', reportRoutes);   // Admin Data & Exporting [cite: 52, 96]

// Health Check Endpoint
app.get('/status', (req, res) => {
  res.json({ 
    status: 'Al-Dhow Backend Online', 
    timestamp: new Date().toISOString() 
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`-------------------------------------------`);
  console.log(`Al-Dhow Warehouse API running on port ${PORT}`);
  console.log(`Cron Job: Scheduled for 23:59 Daily`);
  console.log(`-------------------------------------------`);
});