const express = require('express');
const router = express.Router();
const pet = require('../models/pet-schema.js');

//Index Route
router.get('/', (req,res) => {
    pet.find({}, (err,foundPets) => {
        res.json(foundPets);
    })
})

//Create Route
router.post('/', (req,res) => {
    pet.create(req.body, (err,createdPet) => {
        res.json(createdPet)
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
        res.json(updatedPet)
    })
})

module.exports = router;
