const mongoose = require('mongoose');
// const moment = require('moment-timezone');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    passengerFirstName: {
        type: String,
        required: true,
    },
    passengerLastName: {
        type: String,
        required: true,
    },
    passengerEmailID: {
        type: String,
        required: true,
    },
    parentEmailID: {
        type: String,
        required: true,
    },
    flightNumber: {
        type: Number,
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    mileageRewardsUsed: {
        type: Number,
        default: 0,
    },
    numOfSeats: {
        type: Number,
    },
    seatNumber: {
        type: String,
    },
    price: {
        type: Number,
    },
    startTime: {
        type: String,
    },
    endTime: {
        type: String,
    },
    status: {
        type: String,
    },
});

module.exports = Booking = mongoose.model('bookings', bookingSchema);
