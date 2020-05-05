//Her definerer vi hvordan en user gemmes i databasen
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    password: String,
    name: String,
    address: String,
    phoneNumber: String,
    email: String,
    practitioner: Boolean
});

module.exports = mongoose.model('User', userSchema);
