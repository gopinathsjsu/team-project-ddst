const express = require('express');
const passengerSchema = require('../models/Passenger');
const bookingSchema = require('../models/Booking');
const flightSchema = require('../models/Flight');
const router = express.Router();

router.post('/search', async (req, res) => {
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

router.post('/selectFlight', async (req, res) => {
    const id = req.body.id;
    flightSchema.findOne({ _id: id }).then((selectFlight) => {
        if (selectFlight) {
            res.json({ selectFlight });
        } else res.json({ status: false, message: 'Error while selecting!' });
    });
});

router.post('/seatDetails', async (req, res) => {
    try {
        let passengerFirstName = req.body.passengerFirstName;
        let passengerLastName = req.body.passengerLastName;
        let seatNumber = req.body.seatNumber;
        await flightSchema.updateOne({ seatsAvailable: seatNumber }, { $pull: { seatsAvailable: seatNumber } });
        await flightSchema.updateOne({ $push: { seatsTaken: seatNumber } });
        res.status(200).json({ message: 'Seat added successfully' });
        console.log();
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
