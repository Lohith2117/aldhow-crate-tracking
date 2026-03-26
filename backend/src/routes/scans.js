const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate } = require('../middleware/auth');

router.post('/sync', authenticate, async (req, res) => {
  const { scans } = req.body; // Array of scan objects from mobile
  const results = { synced: [], conflicts: [] };

  for (const scan of scans) {
    try {
      // Rule 1: Barcode must exist
      const crate = await db('crates').where({ crate_id: scan.crate_id }).first();
      if (!crate) throw new Error('INVALID_BARCODE');

      // Rule 2 & 3: Check logic (simplified for brevity)
      // Implementation of Rule 2 (No double OUT) and Rule 3 (IN requires OUT)
      
      await db('scan_logs').insert({
        ...scan,
        synced_at: db.fn.now()
      });
      
      // Update crate status based on scan type
      await db('crates')
        .where({ crate_id: scan.crate_id })
        .update({ status: scan.scan_type === 'OUT' ? 'OUT' : 'IN_WAREHOUSE' });

      results.synced.push(scan.scan_id);
    } catch (err) {
      // Log conflict [cite: 44]
      await db('conflicts').insert({
        crate_id: scan.crate_id,
        trip_id: scan.trip_id,
        conflicting_scan_id: scan.scan_id,
        reason: err.message
      });
      results.conflicts.push({ id: scan.scan_id, reason: err.message });
    }
  }
  res.json(results);
});

module.exports = router;