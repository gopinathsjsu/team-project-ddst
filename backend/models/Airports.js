const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const airportSchema = new Schema({
    airportName: {
        type: String,
        required: true,
    },
});

module.exports = Airport = mongoose.model('airports', airportSchema);
