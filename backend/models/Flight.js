const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
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
    airplaneName: {
        type: String,
        required: true,
    },
    passengerList: {
        type: Array,
        default: [],
    },
    numberOfMiles: {
        type: Number,
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
    seatInfo: {
        seatNumber: {
            type: String,
        },
        seatAvailability: {
            type: String,
        },
    },
});

module.exports = Flight = mongoose.model('flights', flightSchema);
