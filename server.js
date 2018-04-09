const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const morgan = require('morgan')
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(express.json());
app.use(session({
    secret:'feedmeseymour',
    resave:false,
    saveUninitialized:false
}))
app.use(morgan('tiny'));


const petController = require('./controllers/pet-controller.js');
app.use('/pet-a-gram', petController);

const sessionController = require('./controllers/pet-sessions-controller.js');
app.use('/sessions', sessionController);

const postController = require('./controllers/posts-controller.js');
app.use('/posts', postController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/petagram';
mongoose.connect(mongoUri)
mongoose.connection.once('open', () => {
    console.log('The God is listening');
})
app.listen(port, () => {
    console.log('Terminal is listening');
})
