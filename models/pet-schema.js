const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: {type: String, required:true},
    species: String,
    profileImg: String,
    description: String,
    images: [String]
});

const Pets = mongoose.model('Pet', petSchema);

module.exports = Pets;
