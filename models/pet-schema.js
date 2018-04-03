const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: {type: String, required:true},
    species: String,
    profileImg: String,
    description: String,
    images: [String]
});

const Pets = mongoose.model('Pet', petSchema);

module.exports = Pets;
