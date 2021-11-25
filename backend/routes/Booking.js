const express = require('express');
const passengerSchema = require('../models/Passenger');
const bookingSchema = require('../models/Booking');
const flightSchema = require('../models/Flight');
const router = express.Router();

router.post('/search', (req, res) => {
    flightSchema.find({ origin: req.body.origin, destination: req.body.destination }).exec((err, flightSchema) => {
        if (err) {
            res.json({ status: false, message: 'Error while searching' });
        } else res.json({ flightSchema });
    });
});

module.exports = router;
