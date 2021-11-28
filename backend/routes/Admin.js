const express = require('express');
const adminSchema = require('../models/Admin');
const flightSchema = require('../models/Flight');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const airportSchema = require('../models/Airports');

router.post('/adminRegister', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    adminSchema.findOne({ email: req.body.emailID }).then((user) => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new adminSchema({
                adminFirstName: req.body.firstName,
                adminLastName: req.body.lastName,
                email: req.body.emailID,
                password: req.body.password,
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
});

router.post('/adminLogin', (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.emailID;
    const password = req.body.password;
    // Find user by email
    adminSchema.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }
        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('Successful Login');
            } else {
                return res.status(400).json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

router.post('/addFlights', (req, res) => {
    flightSchema.findOne({ flightNumber: req.body.flightNumber }).then((flight) => {
        if (flight) {
            return res.status(400).json({ message: 'Flight already exists' });
        } else {
            const newFlight = new flightSchema({
                flightNumber: req.body.flightNumber,
                origin: req.body.origin,
                destination: req.body.destination,
                airplaneName: req.body.airplaneName,
                price: req.body.price,
                numberOfMiles: req.body.numberOfMiles,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
            });

            newFlight
                .save()
                .then((flight) => res.json(flight))
                .catch((err) => console.log(err));
        }
    });
});

router.post('/deleteFlight', function (req, res) {
    flightSchema
        .findOneAndDelete({ flightNumber: req.body.flightNumber })
        .then((deleteflight) => {
            // console.log(deleteflight);
            if (deleteflight) {
                res.status(200).json({ message: 'Flight deleted successfully!' });
            } else {
                res.status(400).json({ message: 'Flight does not exist!' });
            }
        })
        .catch((err) => console.log(err));
});

router.post('/addAirports', async (req, res) => {
    airportSchema.findOne({ airportName: req.body.airportName }).then((airport) => {
        if (airport) {
            return res.status(400).json({ message: 'Airport already exists' });
        } else {
            const newAirport = new airportSchema({
                airportName: req.body.airportName,
            });
            newAirport
                .save()
                .then((airport) => res.json(airport))
                .catch((err) => console.log(err));
        }
    });
});

module.exports = router;
