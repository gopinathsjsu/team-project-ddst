const express = require('express');
const passengerSchema = require('../models/Passenger');
const bookingSchema = require('../models/Booking');
const flightSchema = require('../models/Flight');
const router = express.Router();

// function convertUTCDateToLocalDate(date) {
//     var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//     var offset = date.getTimezoneOffset() / 60;
//     var hours = date.getHours();

//     newDate.setHours(hours - offset);

//     return newDate;
// }

router.post('/search', async (req, res) => {
    let result = await flightSchema.find({ origin: req.body.origin, destination: req.body.destination });
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            // let origin_date_time = convertUTCDateToLocalDate(result[i].startTime)
            // let destination_date_time = convertUTCDateToLocalDate(result[i].endTime)
            // origin_date_time=JSON.stringify(origin_date_time)
            // destination_date_time=JSON.stringify(destination_date_time)
            // let origin_date_string=origin_date_time.split("T")[0].substring(1,)
            // let origin_time_string=origin_date_time.split("T")[1].substring(0,5)
            // let origin_result_string = origin_date_string+" "+origin_time_string
            // // let origin_result_string_final = JSON.stringify(origin_result_string)
            // // let d = new Date(origin_result_string_final)
            // // console.log(result[i].startTime)
            // // console.log(origin_result_string)
            // // console.log(typeof(origin_result_string))
            // result[i].startTime = origin_result_string
            // console.log("HEY",result[i].startTime)
            // result[i].startTime.toString()
            // destination_date_string=destination_date_time.split("T")[0].substring(1,)
            // destination_time_string=destination_date_time.split("T")[1].substring(0,5)
            // destination_result_string=destination_date_string+" "+destination_time_string
            // result[i].endTime=destination_result_string
            // console.log(destination_result_string)
            // console.log(result[i].endTime)
        }

        res.status(200).json({ flightSchema: result });
    } else {
        res.json('No flights exist');
    }
});

router.post('/selectFlight', async (req, res) => {
    const id = req.body.id;
    flightSchema.findOne({ _id: id }).then((selectFlight) => {
        if (selectFlight) {
            res.json({ selectFlight });
        } else res.json({ status: false, message: 'Error while selecting!' });
    });
});

router.post('/getBookedFlight', async (req, res) => {
    const flightNumber = req.body.flightNumber;
    flightSchema.findOne({ flightNumber: flightNumber }).then((getFlight) => {
        if (getFlight) {
            res.json({ getFlight });
        } else res.json({ status: false, message: 'No such flight available!' });
    });
});

async function milesUpdate(emailID, userDetails, selectFlight, mileagePoints) {
    mileagePoints = userDetails.mileageRewards + Math.round(selectFlight.numberOfMiles / 100);
    await passengerSchema.updateOne({ emailID: emailID }, { $set: { mileageRewards: mileagePoints } });
    return;
}

async function seatUpdate(selectFlight, seatNumber) {
    const flag = 0;
    if (selectFlight.seatsAvailable.indexOf(seatNumber) === -1) {
        return flag;
    }
    await flightSchema.updateOne({ seatsAvailable: seatNumber }, { $pull: { seatsAvailable: seatNumber } });
    const temp = 1;
    return temp;
}

async function flightReserved(emailID, selectFlight) {
    await passengerSchema.updateOne({ emailID: emailID }, { $push: { flightsReserved: selectFlight.id } });
    return;
}

router.post('/passengerDetails', async (req, res) => {
    try {
        let passengerFirstName = req.body.passengerFirstName;
        let passengerLastName = req.body.passengerLastName;
        let passengerEmailID = req.body.passengerEmailID;
        let seatNumber = req.body.seatNumber;
        let emailID = req.body.emailID;
        let id = req.body.id;
        flightSchema.findOne({ _id: id }).then((selectFlight) => {
            if (selectFlight) {
                passengerSchema.findOne({ emailID }).then((userDetails) => {
                    if (userDetails) {
                        seatUpdate(selectFlight, seatNumber).then((result) => {
                            if (result === 0) {
                                return res.json({ message: 'Seat not available. Please choose another seat!' });
                            } else {
                                let mileagePoints = 0;
                                milesUpdate(emailID, userDetails, selectFlight, mileagePoints);
                                flightReserved(emailID, selectFlight);
                                let passengerDetail = new bookingSchema({
                                    passengerFirstName: passengerFirstName,
                                    passengerLastName: passengerLastName,
                                    passengerEmailID: passengerEmailID,
                                    parentEmailID: emailID,
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
                            }
                        });
                    } else return res.json({ status: false, message: 'Please login to Book the flight!' });
                });
            } else res.json({ status: false, message: 'Error while selecting!' });
        });
    } catch (error) {
        console.log(error);
    }
});

async function milesDelete(emailID, userDetails, cancelSeat, mileagePoints) {
    mileagePoints = userDetails.mileageRewards - Math.round(cancelSeat.numberOfMiles / 100);
    await passengerSchema.updateOne({ emailID: emailID }, { $set: { mileageRewards: mileagePoints } });
    return;
}

async function seatDelete(cancelSeat, seatNumber) {
    if (cancelSeat.seatsAvailable.indexOf(seatNumber) !== -1) {
        return;
    }
    await flightSchema.updateOne({ _id: cancelSeat.id }, { $push: { seatsAvailable: seatNumber } });
    return;
}

async function flightCanceled(emailID, cancelSeat) {
    await passengerSchema.updateOne({ emailID: emailID }, { $pull: { flightsReserved: cancelSeat.id } });
    return;
}


router.post('/payByMileagePoints', async(req,res)=>{
    try{
        let mileageRewardsPresent = req.body.mileageRewards;
        let seatNumber = req.body.seatNumber;
        let emailID = req.body.emailID;
        let passengerEmailID = req.body.passengerEmailID;
        let id = req.body.id;
    }
    catch (error) {
        console.log(error);
    }

});


router.post('/cancelReservation', async (req, res) => {
    try {
        let seatNumber = req.body.seatNumber;
        let emailID = req.body.emailID;
        let passengerEmailID = req.body.passengerEmailID;
        let id = req.body.id;

        flightSchema.findOne({ _id: id }).then((cancelSeat) => {
            if (cancelSeat) {
                bookingSchema
                    .findOneAndDelete({ passengerEmailID, flightNumber: cancelSeat.flightNumber })
                    .then((cancelReservation) => {
                        if (cancelReservation) {
                            passengerSchema.findOne({ emailID }).then((userDetails) => {
                                if (userDetails) {
                                    let mileagePoints = 0;
                                    milesDelete(emailID, userDetails, cancelSeat, mileagePoints);
                                    flightCanceled(emailID, cancelSeat);
                                    seatDelete(cancelSeat, seatNumber);
                                }
                            });
                            res.status(200).json({ message: 'Reservation canceled successfully!' });
                        } else {
                            res.status(400).json({ message: 'Reservation does not exist!' });
                        }
                    })
                    .catch((err) => console.log(err));
            } else res.json({ status: false, message: 'No such flight found!' });
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
