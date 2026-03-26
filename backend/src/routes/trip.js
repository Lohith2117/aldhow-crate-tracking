const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');

// Create a new trip (Phase 3)
router.post('/', authenticate, async (req, res) => {
  const { driver_id, date, trip_number } = req.body;
  try {
    const [trip] = await db('trips').insert({
      driver_id,
      date,
      trip_number,
      status: 'CREATED'
    }).returning('*');
    res.status(201).json(trip);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create trip' });
  }
});

// Update trip status (e.g., DISPATCHED, RETURNED)
router.patch('/:id/status', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // CREATED, LOADING, DISPATCHED, RETURNED, CLOSED
  
  try {
    const updateData = { status };
    if (status === 'DISPATCHED') updateData.dispatched_at = db.fn.now();
    if (status === 'RETURNED') updateData.returned_at = db.fn.now();
    if (status === 'CLOSED') updateData.closed_by = req.user.id;

    await db('trips').where({ trip_id: id }).update(updateData);
    res.json({ message: `Trip status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;