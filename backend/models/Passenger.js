const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const passengerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    emailID: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    flightsReserved: {
        type: Array,
        default: [],
    },
    mileageRewards: {
        type: Number,
        default: 0,
    },
    creditCardNumber: {
        type: Number,
    },
});

module.exports = User = mongoose.model('passenger', passengerSchema);
