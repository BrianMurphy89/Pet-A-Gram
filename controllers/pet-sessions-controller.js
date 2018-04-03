const express = require('express');
const router = express.Router();
const user = require('../models/pet-schema.js')
const bcrypt = require('bcrypt');

router.get('/' , (req,res) => {
    if(req.session.currentuser){
        res.json(req.session.currentuser)
    }   else{
        res.status(401).json({
            status:401,
            message:'Sorry! You are not logged in.'
        });
    }
});

router.post('/signup' , (req,res) => {
    user.findOne({username:req.body.username}, (err, foundUser) => {
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentuser = foundUser
            res.status(201).json({
                status:201,
                message:'Login Successful'
            })
        }   else {
                res.status(401).json({
                    status:401,
                    message:'Login Failed'
                })
        }
    })
})

router.delete('/destroy-route', (req,res)=>{
    console.log(req.session.currentuser);
    req.session.destroy( function(){
        res.status(200).json({
            status:200,
            message:'logout complete'
        })
        })
    })


module.exports = router;
