//Her definerer vi hvordan et animal gemmes i databasen
const mongoose = require('mongoose');

const animalSchema = mongoose.Schema({
    type: String,
    race: String,
    name: String,
    age: String,
    location: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'} // eller userSchema?
});

module.exports = mongoose.model('Animal', animalSchema);
