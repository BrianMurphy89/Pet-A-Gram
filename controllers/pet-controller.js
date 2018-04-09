const express = require('express');
const router = express.Router();
const pet = require('../models/pet-schema.js');
const bcrypt = require('bcrypt');

//Index Route
router.get('/', (req,res) => {
    pet.find({}, (err,foundPets) => {
        console.log(foundPets[0].posts);
        res.json(foundPets);
    })
})

//Create Route
router.post('/', (req,res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    pet.create(req.body, (err,createdPet) => {
        // res.status(201).json({
        //     status:201,
        //     message:'User Created'
        // })
        res.json(createdPet);
    })
})

//Delete Route
router.delete('/:id' , (req,res) => {
    pet.findByIdAndRemove(req.params.id, (err, deletePet) => {
        res.json(deletePet)
    })
})

//Edit Route
router.put('/:id' , (req, res) => {
    pet.findByIdAndUpdate(req.params.id, req.body, {new:true} , (err,updatedPet) => {
        console.log(updatedPet);
        res.json(updatedPet)
    })
})

// show route
router.get('/:id', (req,res)=>{
    pet.findById(req.params.id, (err,foundPet)=>{
        res.json(foundPet)
    })
})
module.exports = router;
