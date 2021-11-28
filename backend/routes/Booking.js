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


//// API IS IMPORTANT
// async function milesUpdate(emailID, userDetails, selectFlight, mileagePoints) {
//     mileagePoints = userDetails.mileageRewards + Math.round(selectFlight.numberOfMiles / 100);
//     await passengerSchema.updateOne({ emailID: emailID }, { $set: { mileageRewards: mileagePoints } });
//     return;
// }

// // Try-Catch remaining
// async function seatUpdate(selectFlight,seatNumber) {
//     let flag = "Not Available";
//     if(selectFlight.seatsAvailable.indexOf(seatNumber)===-1){
//         return flag;
//     }
//     await flightSchema.updateOne({ seatsAvailable: seatNumber }, { $pull: { seatsAvailable: seatNumber } });
//     return;
// }

// async function flightReserved(emailID, selectFlight) {
//     await passengerSchema.updateOne({ emailID: emailID }, { $push: { flightsReserved: selectFlight.id } });
//     return;
// }

// router.post('/passengerDetails', async (req, res) => {
//     try {
//         let passengerFirstName = req.body.passengerFirstName;
//         let passengerLastName = req.body.passengerLastName;
//         let seatNumber = req.body.seatNumber;
//         let emailID = req.body.emailID;
//         let id = req.body.id;
//         flightSchema.findOne({ _id: id }).then((selectFlight) => {
//             if (selectFlight) {
//                 flag = seatUpdate(selectFlight,seatNumber);
//                 if(flag==="Not Available"){
//                     return res.json({message:"Seat not Available, choose another seat!"});
//                 }
//                 passengerSchema.findOne({ emailID }).then((userDetails) => {
//                     if (userDetails) {
//                         let mileagePoints = 0;
//                         milesUpdate(emailID, userDetails, selectFlight, mileagePoints);
//                         flightReserved(emailID, selectFlight);
//                     } else res.json({ status: false, message: 'Error while selecting!' });
//                 });
//                 let passengerDetail = new bookingSchema({
//                     passengerFirstName: passengerFirstName,
//                     passengerLastName: passengerLastName,
//                     flightNumber: selectFlight.flightNumber,
//                     airplaneName: selectFlight.airplaneName,
//                     origin: selectFlight.origin,
//                     destination: selectFlight.destination,
//                     seatNumber: seatNumber,
//                     price: selectFlight.price,
//                     startTime: selectFlight.startTime,
//                     endTime: selectFlight.endTime,
//                 });
//                 passengerDetail
//                     .save()
//                     .then((passengerDetail) => res.json(passengerDetail))
//                     .catch((err) => console.log(err));
//             } else res.json({ status: false, message: 'Error while selecting!' });
//         });
//     } catch (error) {
//         console.log(error);
//     }
// });

module.exports = router;
