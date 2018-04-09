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

router.post('/', (req,res)=>{
    Pet.findById(req.body.petId, (err, foundPet)=>{
        console.log(req.body);
        Post.create(req.body, (err, createdPost)=>{
            foundPet.posts.push(createdPost);
            foundPet.save((err, data)=>{
                res.json(foundPet);
            });
        });
    });
});

router.delete('/:id', (req,res)=>{
    Post.findByIdAndRemove(req.params.id, (err,foundPost)=>{
        Pet.findOne({'Pet._id':req.params.id}, (err,foundPet)=>{
            foundPet.posts.id(req.params.id).remove();
            foundPet.save((err,data)=>{
                res.json(foundPet);
            });
        });
    });
});

module.exports = router;
