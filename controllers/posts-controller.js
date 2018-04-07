const express = require('express');
const router = express.Router();
const Post = require('../models/posts.js');
const Pet = require('../models/pet-schema.js');


router.get('/', (req, res)=>{
    Post.find({}, (err, foundPosts)=>{
        res.json(foundPosts);
    });
});

router.get('/new', (req,res)=>{
    Pet.find({}, (err, allPets)=>{
        res.json(allPets);
    });
});

router.post('/:id', (req,res)=>{
    Pet.findById(req.params.id, (err, foundPet)=>{
        Post.create(req.body, (err, createdPost)=>{
            foundPet.posts.push(createdPost);
            foundPet.save((err, data)=>{
                res.json(foundPet);
            });
        });
    });
});


module.exports = router;
