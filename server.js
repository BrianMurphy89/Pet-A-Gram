const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const petController = require('./controllers/pet-controller.js');
app.use('/pet-a-gram', petController);

const sessionController = require('./controllers/pet-sessions-controller.js');
app.use('/pet-a-gram', sessionController);

mongoose.connect('mongodb://localhost:27017/petagram');
mongoose.connection.once('open', () => {
    console.log('The God is listening');
})
app.listen(3000, () => {
    console.log('Terminal is listening');
})
