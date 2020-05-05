//Her definerer vi hvordan en booking gemmes i databasen
const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    date: String, //Ex 22/04-2020
    time: String, //Ex 08:00-10:00
    practitioner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Ex Sanel
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, //Ex Emma
    availability: Boolean //Ex True/False
});

module.exports = mongoose.model('Booking', bookingSchema);