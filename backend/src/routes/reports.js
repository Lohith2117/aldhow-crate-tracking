const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

// GET /reports/daily - Daily missing crate summary 
router.get('/daily', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const summary = await db('alerts')
      .where('date', today)
      .select('alert_id', 'driver_id', 'trip_id', 'missing_count', 'status');
    
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch daily report' });
  }
});

// GET /reports/driver/:id - Driver-level crate history 
router.get('/driver/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  const driver_id = req.params.id;
  try {
    const driver = await db('drivers').where({ driver_id }).first();
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    // Calculate lifetime stats for the driver [cite: 96]
    const stats = await db('alerts')
      .where({ driver_id })
      .select(
        db.raw('count(alert_id) as total_alerts'),
        db.raw('sum(missing_count) as total_missing')
      ).first();

    const recentTrips = await db('trips')
      .where({ driver_id })
      .orderBy('date', 'desc')
      .limit(10);

    res.json({
      driverName: driver.name,
      totalMissing: stats.total_missing || 0,
      totalAlerts: stats.total_alerts || 0,
      recentTrips
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch driver history' });
  }
});

module.exports = router;