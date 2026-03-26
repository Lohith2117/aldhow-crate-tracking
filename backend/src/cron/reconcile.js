const cron = require('node-cron');
const db = require('../db');

// Schedule for 23:59 (11:59 PM) every day [cite: 82]
cron.schedule('59 23 * * *', async () => {
  console.log('Running End-of-Day Reconciliation...');

  try {
    // 1. Find all trips that are DISPATCHED or RETURNED but not yet CLOSED [cite: 83]
    const activeTrips = await db('trips')
      .whereIn('status', ['DISPATCHED', 'RETURNED']);

    for (const trip of activeTrips) {
      // 2. Get set of crates scanned OUT vs IN [cite: 83]
      const outScans = await db('scan_logs')
        .where({ trip_id: trip.trip_id, scan_type: 'OUT' })
        .pluck('crate_id');

      const inScans = await db('scan_logs')
        .where({ trip_id: trip.trip_id, scan_type: 'IN' })
        .pluck('crate_id');

      // 3. Find missing (OUT but not IN) [cite: 84]
      const missingCrates = outScans.filter(id => !inScans.includes(id));

      if (missingCrates.length > 0) {
        // 4. Create Alert [cite: 86]
        await db('alerts').insert({
          driver_id: trip.driver_id,
          trip_id: trip.trip_id,
          missing_count: missingCrates.length,
          missing_crate_ids: JSON.stringify(missingCrates),
          date: db.fn.now()
        });

        // 5. Update crate statuses to MISSING [cite: 86, 87]
        await db('crates')
          .whereIn('crate_id', missingCrates)
          .update({ status: 'MISSING' });
      }

      // 6. Force close the trip [cite: 88, 90]
      await db('trips')
        .where({ trip_id: trip.trip_id })
        .update({ status: 'CLOSED' });
    }
    console.log('Reconciliation complete.');
  } catch (err) {
    console.error('Cron Error:', err);
  }
});