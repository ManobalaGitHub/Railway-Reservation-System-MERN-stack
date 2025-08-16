const express = require('express');
const router = express.Router();
const Train = require('../models/Train'); // Or whatever model you use

router.post('/', async (req, res) => {
  try {
    const newTrain = new Train(req.body);
    await newTrain.save();
    res.status(201).json({ message: 'Train scheduled successfully' });
  } catch (err) {
    console.error("❌ Error scheduling train:", err);
    res.status(500).json({ error: 'Failed to schedule train' });
  }
});

module.exports = router;
