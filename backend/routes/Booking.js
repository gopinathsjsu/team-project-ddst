const express = require('express');
const passengerSchema = require('../models/Passenger');
const bookingSchema = require('../models/Booking');
const flightSchema = require('../models/Flight');
const router = express.Router();

router.post('/search', (req, res) => {
    flightSchema.find({ origin: req.body.origin, destination: req.body.destination, startTime: req.body.startTime }).exec((err, flightSchema) => {
        if (err) {
            console.log(err);
            res.json({ status: false, message: 'Error while searching' });
        }
        if (flightSchema.length) {
            res.json({ flightSchema });
        } else {
            res.json('No flights exist');
        }
    });
});

router.post('/selectFlight', (req, res) => {
    const id = req.body.id;
    flightSchema.findOne({ _id: id }).then((selectFlight) => {
        if (selectFlight) {
            res.json({ selectFlight });
        } else res.json({ status: false, message: 'Error while selecting!' });
    });
});

router.post('/seatDetails', (req, res) => {
    const passengerFirstName = req.body.passengerFirstName;
    const passengerLastName = req.body.passengerLastName;
    const seatNumber = req.body.seatNumber;
});

module.exports = router;
