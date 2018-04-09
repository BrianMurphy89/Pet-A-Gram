const mongoose = require('mongoose');
const Post = require('./posts.js')

const petSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: {type: String, required:true},
    species: String,
    profileImg: String,
    description: String,
    posts: [Post.schema]
});

const Pets = mongoose.model('Pet', petSchema);

module.exports = Pets;
