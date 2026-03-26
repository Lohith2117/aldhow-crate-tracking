const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');

// Generate N barcodes
router.get('/generate', authenticate, async (req, res) => {
  const count = parseInt(req.query.n) || 1;
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  
  try {
    const newCrates = [];
    for (let i = 0; i < count; i++) {
      const randomSuffix = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
      const crate_id = `CRT-${dateStr}-${randomSuffix}`;
      
      await db('crates').insert({
        crate_id,
        status: 'IN_WAREHOUSE',
        generated_by: req.user.id
      });
      newCrates.push(crate_id);
    }
    res.json({ barcodes: newCrates });
  } catch (err) {
    res.status(500).json({ error: 'Error generating barcodes' });
  }
});

// Confirm printing
router.post('/print-confirm', authenticate, async (req, res) => {
  const { crate_ids } = req.body;
  try {
    await db('crates')
      .whereIn('crate_id', crate_ids)
      .update({ printed_at: db.fn.now() });
    res.json({ message: 'Print confirmed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;