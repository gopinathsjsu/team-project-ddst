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

// router.post('/seatDetails', async (req, res) => {
//     try {
//         let passengerFirstName = req.body.passengerFirstName;
//         let passengerLastName = req.body.passengerLastName;
        // let seatNumber = req.body.seatNumber;
        // let id = req.body.id;
        // flightSchema.findOne({ _id: id }).then((selectFlight) => {
        //     if (selectFlight) {
        //         // console.log(selectFlight);
        //         // res.json({ selectFlight });
        //         let seatsAvailable = selectFlight.seatsAvailable;
        //         let seatsTaken = selectFlight.seatsTaken;
        //         // console.log(seatsAvailable);
        //         for(var i=0;i<seatsAvailable.length;i++){
        //             var tempSeat = seatsAvailable[i];
        //             if(tempSeat==seatNumber){
        //                 // console.log("tempSeat-------------------------");
        //                 // seatsAvailable.pull(seatNumber);
        //                 // seatsTaken.push(seatNumber);
        //                 // console.log(seatsAvailable);
        //                 // console.log(seatsTaken);

        //                 flightSchema.findByIdAndUpdate({ _id: id  },{$set:{ seatsAvailable: seatsAvailable }});
        //                 flightSchema.findByIdAndUpdate({ _id: id  },{$set:{ seatsTaken: seatsTaken }});
        //                 res.json({ message: 'Seat added successfully' });
        //                 break;
        //             }
        //             // else{
        //             //     res.json({ message: 'Seat not available' });
        //             // }
        //         }
        //     } else res.json({ status: false, message: 'Error while selecting!' });
        // });
        // let seatsAvailable = flightSchema
        
        // await flightSchema.updateOne({ seatsAvailable: seatNumber }, { $pull: { seatsAvailable: seatNumber } });
        // await flightSchema.updateOne({ $push: { seatsTaken: seatNumber } });
        // res.status(200).json({ message: 'Seat added successfully' });
        
//     } catch (error) {
//         console.log(error);
//     }
// });



router.post('/passengerDetails', async (req, res) => {
    try {
        let passengerFirstName = req.body.passengerFirstName;
        let passengerLastName = req.body.passengerLastName;
        let seatNumber = req.body.seatNumber;
        await flightSchema.updateOne({ seatsAvailable: seatNumber }, { $pull: { seatsAvailable: seatNumber } });
        let id = req.body.id;
        flightSchema.findOne({ _id: id }).then((selectFlight) => {
            if (selectFlight) {
                const passengerDetail = new bookingSchema({
                    passengerFirstName: passengerFirstName,
                    passengerLastName: passengerLastName,
                    flightNumber: selectFlight.flightNumber,
                    airplaneName: selectFlight.airplaneName,
                    origin: selectFlight.origin,
                    destination: selectFlight.destination,
                    seatNumber: seatNumber,
                    price: selectFlight.price,
                    startTime: selectFlight.startTime,
                    endTime: selectFlight.endTime,
                });
                passengerDetail
                .save()
                .then((passengerDetail) => res.json(passengerDetail))
                .catch((err) => console.log(err));
            } else res.json({ status: false, message: 'Error while selecting!' });
        });
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;
