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
        // type: String,
        type: Date,
        default: Date.now,
    },
    endTime: {
        // type: String,
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
    },
    seatsAvailable: {
        type: Array,
        default: [
            '1A',
            '1B',
            '1C',
            '1D',
            '1E',
            '2A',
            '2B',
            '2C',
            '2D',
            '2E',
            '3A',
            '3B',
            '3C',
            '3D',
            '3E',
            '4A',
            '4B',
            '4C',
            '4D',
            '4E',
            '5A',
            '5B',
            '5C',
            '5D',
            '5E',
        ],
    },
});

module.exports = Flight = mongoose.model('flights', flightSchema);
