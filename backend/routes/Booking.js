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

router.post('/selectFlight', (req, res) => {
    const flightNumber = req.body.flightNumber;
    flightSchema.find({ flightNumber: flightNumber }).then((selectFlight) => {
        if (selectFlight) {
            res.json({ flightSchema });
        } else res.json({ status: false, message: 'Error while selecting!' });
    });
});

router.post('/seatDetails', (req, res) => {
    const passengerFirstName = req.body.passengerFirstName;
    const passengerLastName = req.body.passengerLastName;
    const seatNumber = req.body.seatNumber;

    console.log(passengerFirstName);
});

module.exports = router;
