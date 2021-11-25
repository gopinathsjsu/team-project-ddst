const mongoose = require('mongoose');
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
    flightNumber: {
        type: Number,
        required: true,
    },
    airplaneName: {
        type: String,
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
    seatNumber: {
        type: String,
    },
    price: {
        type: Number,
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
    },
});

module.exports = Booking = mongoose.model('bookings', bookingSchema);
